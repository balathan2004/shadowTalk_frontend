import React, { FC } from "react";
import { useNotifyContext } from "../context/notification_context";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";

const NotifyPopup: FC = () => {
  const { notify, setNotify } = useNotifyContext();
  const router = useNavigate();

  const handleClose = () => {
    console.log("closed");
    setNotify(null); // Reset the reply message
  }; // Add dependencies

  const pushToChat = () => {
    router(`/chat?chatId=${notify?.msgData.senderId}`);
  };

  return (
    <Snackbar
      open={!!notify}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={5000}
      onClose={handleClose}
      onClick={pushToChat}
      message={
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            referrerPolicy="no-referrer"
            src={notify?.senderInfo?.photoUrl || "/default-pfp.png"}
            alt="pfp"
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <span>Message From {notify?.senderInfo.username}</span>

            <span>
              <strong>{notify?.msgData.content}</strong>
            </span>
          </div>
        </div>
      }
    />
  );
};

export default NotifyPopup;
