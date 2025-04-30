import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Login from "../components/pages/auth/login";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Account from "../components/pages/account";
import Feeds from "../components/pages/feeds";
import Explore from "../components/pages/explore";
import Inbox from "../components/pages/inbox";
import Profile from "../components/pages/profile"
import BottomNav from "../components/elements/bottomNav";
import ContextWrapper from "../components/context/context_wrapper";
import LoadingHolder from "../components/context/loading_context";
import UserContextHolder from "../components/context/user_context";
import ReplyHolder from "../components/context/reply_context";
import ChatScreen from "../components/pages/chatScreen";
import {
  SocketProvider,
  useSocket,
} from "../components/context/socket_context";
import NotifyHolder, {
  useNotifyContext,
} from "../components/context/notification_context";
import { ChatMessageInterface, OutgoingMessagePayload } from "../components/interfaces";
import { serverUrl } from "../env";
function App() {
  const client = new ApolloClient({
    uri: `${serverUrl}/graphql`, // Ensure this is correct
    cache: new InMemoryCache({ addTypename: false }),
  });

  return (
    <ApolloProvider client={client}>
      <div className="container">
        <LoadingHolder>
          <UserContextHolder>
            <ReplyHolder>
              <NotifyHolder>
                <SocketProvider>
                  <ContextWrapper>
                    <Routes>
                      <Route path="/" element={<Layout />}>
                        <Route path="/account" element={<Account />}></Route>
                        <Route path="/explore" element={<Explore />}></Route>
                        <Route path="/feeds" element={<Feeds />}></Route>
                        <Route path="/inbox" element={<Inbox />}></Route>
                      </Route>
                      <Route path="/chat" element={<ChatScreen />}></Route>
                      <Route path="/profile" element={<Profile />}></Route>
                      <Route path="/auth/login" element={<Login />}></Route>
                    </Routes>
                  </ContextWrapper>
                </SocketProvider>
              </NotifyHolder>
            </ReplyHolder>
          </UserContextHolder>
        </LoadingHolder>
      </div>
    </ApolloProvider>
  );
}

function Layout() {
  const { socket } = useSocket();
  const { setNotify } = useNotifyContext();

  useEffect(() => {
    const handleNewMessage = (args: OutgoingMessagePayload) => {
      setNotify(args);
    };

    socket?.on("messageData", handleNewMessage);

    return () => {
      socket?.off("messageData", handleNewMessage); // Cleanup to prevent duplicates
    };
  }, []);

  return (
    <div className="home_container">
      <Outlet />
      <BottomNav />
    </div>
  );
}

export default App;
