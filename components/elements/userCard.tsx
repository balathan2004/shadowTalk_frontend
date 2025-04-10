import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
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
      <Link to={`/chat?chatId=${data._id}`} key={data._id}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={`${data.username}'s profile`} src={data.photoUrl} />
          </ListItemAvatar>
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
        </ListItem>
      </Link>
    </>
  );
}
