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
    router(`/chat?chatId=${notify?.senderId}`);
  };

  return (
    <Snackbar
      open={!!notify}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={5000}
      message={"New meesages"}
      onClose={handleClose}
      onClick={pushToChat}
    />
  );
};

export default NotifyPopup;
