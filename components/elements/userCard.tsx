import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { userDataInterface } from "../interfaces";
import { Link } from "react-router-dom";

interface Props {
  data: userDataInterface;
}

export default function AlignItemsList({ data }: Props) {
  return (
    <>
      <ListItem alignItems="flex-start">
      <Link to={`/profile?${data._id}`} key={data._id}>

        <ListItemAvatar>

          <Avatar alt={`${data.username}'s profile`} src={data.photoUrl} />
        </ListItemAvatar>
        </Link>

        <Link to={`/chat?chatId=${data._id}`} key={data._id}>
          <ListItemText
            primary={data.username}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary", display: "inline" }}
                >
                  {data.displayName}
                </Typography>
              </React.Fragment>
            }
          />
        </Link>
      </ListItem>
    </>
  );
}
