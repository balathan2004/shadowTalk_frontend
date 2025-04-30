import React, { useState, useEffect, useRef } from "react";
import { useUserContext } from "../context/user_context";
import { gql, useQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import ShortUniqueId from "short-unique-id";
import styles from "../../styles/chat.module.css";
import { useSocket } from "../context/socket_context";
import { serverUrl } from "../../env";
import {
  ChatMessageInterface,
  OutgoingMessagePayload,
  ResponseConfig,
  userDataInterface,
} from "../interfaces";
import { Button, TextField } from "@mui/material";
import SendData from "../utils/sendData";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import {
  format,
  isSameDay,
  isThisMonth,
  isThisWeek,
  isThisYear,
  isToday,
  isYesterday,
} from "date-fns";

const getChatAndUserCred = gql`
  query getChatAndUserCred($myId: ID!, $receiverId: ID!) {
    getChatAndUserCred(myId: $myId, receiverId: $receiverId) {
      receiverId {
        _id
        username
        photoUrl
        displayName
      }
      messageData {
        _id
        createdAt
        members
        messages {
          _id
          msgId
          senderId
          receiverId
          content
          createdAt
        }
      }
    }
  }
`;

const formatTimestamp = (timestamp: number) => {
  return format(timestamp, "hh:mm a");
};

const formatSeperator = (date: Date) => {
  if (isToday(date)) {
    return "Today";
  } else if (isYesterday(date)) {
    return "YesterDay";
  } else if (isThisWeek(date)) {
    return format(date, "EEEE");
  } else if (isThisYear(date)) {
    return format(date, "dd MMMM");
  } else {
    return format(date, "dd/MM/yyyy");
  }
};

export default function ChatScreen() {
  const [searchParams] = useSearchParams();
  const [chatId, setChatID] = useState(searchParams.get("chatId"));
  const { userCred } = useUserContext();
  const [chats, setChats] = useState<ChatMessageInterface[]>([]);
  const [input, setInput] = useState("");
  const uid = new ShortUniqueId({ length: 16 });
  const [receiverInfo, setReceiverInfo] = useState<userDataInterface | null>(
    null
  );
  const { data, loading, error } = useQuery(getChatAndUserCred, {
    variables: { myId: userCred?._id, receiverId: chatId },
    skip: !userCred?._id || !chatId,
    fetchPolicy: "network-only",
  });
  const chatRef = useRef<HTMLDivElement | null>(null);
  const { socket } = useSocket();

  useEffect(() => {
    setChatID(searchParams.get("chatId"));
  }, [searchParams]);

  useEffect(() => {
    const handleNewMessage = (args: OutgoingMessagePayload) => {
      setChats((prev) => [...prev, args.msgData]);
    };

    socket?.on("messageData", handleNewMessage);

    return () => {
      socket?.off("messageData", handleNewMessage); // Cleanup to prevent duplicates
    };
  }, [socket]);

  useEffect(() => {
    if (data) {
      setReceiverInfo(data.getChatAndUserCred.receiverId);
      setChats(data.getChatAndUserCred.messageData?.messages || []);
    }
  }, [data]);

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userCred?._id || !chatId || !input) {
      return;
    }
    const msgData: ChatMessageInterface = {
      _id: [userCred._id, chatId].sort().join("@"),
      senderId: userCred._id,
      receiverId: chatId,
      msgId: uid.rnd(),
      content: input,
      createdAt: new Date().getTime(),
    };

    const senderInfo = {
      photoUrl: userCred.photoUrl,
      username: userCred.username,
    };

    const response = (await SendData({
      route: `${serverUrl}/api/messages/store`,
      data: { msgData, senderInfo },
    })) as ResponseConfig;
    if (response && response.status == 200) {
      setChats((prev) => [...prev, msgData]);
      setInput("");
    }
  };

  const scrollToBottom = () => {
    const chatContainer = chatRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setInput(value);
  };

  const YourMsg = ({ data }: { data: ChatMessageInterface }) => {
    return (
      <div className={`${styles.msg} ${styles.right_msg}`}>
        <div className={styles.msg_img}>
          <img
            referrerPolicy="no-referrer"
            className={styles.msg_img}
            src={userCred?.photoUrl}
          ></img>
        </div>

        <div className={styles.msg_bubble}>
          <div className={styles.msg_text}>{data.content}</div>
          <div className={styles.msg_info}>
            <div className={styles.msg_info_time}>
              {formatTimestamp(data.createdAt)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const OtherMsg = ({ data }: { data: ChatMessageInterface }) => {
    return (
      <div className={`${styles.msg} ${styles.left_msg}`}>
        <div className={styles.msg_img}>
          <img
            referrerPolicy="no-referrer"
            className={styles.msg_img}
            src={receiverInfo?.photoUrl}
          ></img>
        </div>

        <div className={styles.msg_bubble}>
          <div className={styles.msg_text}>{data.content} </div>
          <div className={styles.msg_info}>
            <div className={styles.msg_info_time}>
              {formatTimestamp(data.createdAt)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="home_container">
      <section className={styles.msger}>
        <header className={styles.msger_header}>
          <img
            className={styles.msger_avatar}
            referrerPolicy="no-referrer"
            src={receiverInfo?.photoUrl}
          ></img>
          <span>{receiverInfo?.displayName}</span>
        </header>

        <main ref={chatRef} className={styles.msger_chat}>
          {chats.map((msg, index) => {
            const currentDate = new Date(msg.createdAt);
            const prevDate =
              index > 0 ? new Date(chats[index - 1].createdAt) : null;

            const showDateSeparator =
              !prevDate || !isSameDay(currentDate, prevDate);

            return (
              <React.Fragment key={msg.msgId}>
                {showDateSeparator && (
                  <div className="line_text">
                    <span>{formatSeperator(currentDate)}</span>
                  </div>
                )}
                {msg.senderId.toString() === userCred?._id?.toString() ? (
                  <YourMsg data={msg} />
                ) : (
                  <OtherMsg data={msg} />
                )}
              </React.Fragment>
            );
          })}
        </main>

        <form className={styles.msger_inputarea} onSubmit={handleSubmit}>
          <TextField
            className={styles.msger_input}
            multiline
            onChange={handleInput}
            placeholder="Enter your message..."
            fullWidth
            value={input}
          ></TextField>
          <Button variant="outlined" type="submit">
            Send
          </Button>
        </form>
      </section>
    </div>
  );
}
