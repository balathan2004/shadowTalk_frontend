import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AlignItemsList from "../elements/userCard";
import { useUserContext } from "../context/user_context";
import { List } from "@mui/material";
import { userDataInterface } from "../interfaces";

const getUserList = gql`
  query getUserList($myId: ID!) {
    userLists(myId: $myId) {
      _id
      username
      photoUrl
      displayName
    }
  }
`;

export default function Explore() {
  const [value, setValue] = useState(0);
  const { userCred } = useUserContext();

  const { data, loading, error } = useQuery(getUserList, {
    variables: { myId: userCred?._id },
    fetchPolicy: "network-only",
  });


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="inbox_container">
      <h1 className="centerText">Find Users</h1>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {data.userLists.map((item: userDataInterface) => {
          return <AlignItemsList key={item._id} data={item} />;
        })}
      </List>
    </div>
  );
}
