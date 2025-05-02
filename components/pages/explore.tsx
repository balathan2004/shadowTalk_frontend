import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

import AlignItemsList from "../elements/userCard";
import { useUserContext } from "../context/user_context";
import { IconButton, List, TextField } from "@mui/material";
import { userDataInterface } from "../interfaces";
import SearchIcon from "@mui/icons-material/Search";

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
  const { userCred } = useUserContext();

  const { data, loading, error } = useQuery(getUserList, {
    variables: { myId: userCred?._id },
    fetchPolicy: "network-only",
  });

  const [availUsers, setAvailUsers] = useState<userDataInterface[]>([]);

  useEffect(() => {
    if (data) {
      setAvailUsers([...(data.userLists as userDataInterface[])]);
    }
  }, [data]);

  const filterUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (!value) {
      setAvailUsers([...(data.userLists as userDataInterface[])]);
    }

    console.log(value);

    setAvailUsers(() => {
      const results = data.userLists.filter(
        (item: userDataInterface) =>
          item.displayName.includes(value) || item.username.includes(value)
      );
      return results;
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="inbox_container">
      <h1 className="centerText">Find Users</h1>
      <div className="search_container">
        <TextField
          placeholder="Search"
          autoFocus
          fullWidth
          onChange={filterUsers}
        />
        <IconButton>
          <SearchIcon color="primary" fontSize="medium" />
        </IconButton>
      </div>

      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {availUsers.map((item: userDataInterface) => {
          return <AlignItemsList key={item._id} data={item} />;
        })}
      </List>
    </div>
  );
}
