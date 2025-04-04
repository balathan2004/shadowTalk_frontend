import { List } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/user_context";
import { userDataInterface } from "../interfaces";
import { gql, useQuery } from "@apollo/client";
import { useSocket } from "../context/socket_context";
import AlignItemsList from "../elements/userCard";
const getChatList = gql`
  query getChatList($myId: ID!) {
    getChatList(myId: $myId) {
      contacts{
      _id
    displayName
    photoUrl
    username
}
    }
  }
`;

export default function Inbox() {
  const { userCred } = useUserContext();
  const {socket}=useSocket()
  const { data, loading, error } = useQuery(getChatList, {
    variables: { myId: userCred?._id },
    fetchPolicy: "network-only",
    skip: !userCred,
  });

  console.log(data);


  useEffect(()=>{
    socket?.emit("active","active")
  },[])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="inbox_container" >
      <h1 className="centerText">Your Chats</h1>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {data.getChatList.contacts.map((item: userDataInterface) => {
          return <AlignItemsList key={item._id} data={item} />;
        })}
      </List>
    </div>
  );
}
