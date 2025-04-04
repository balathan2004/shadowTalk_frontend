import React, { FC, ReactNode, useEffect } from "react";
import { useUserContext } from "./user_context";
import { AuthResponseConfig } from "../interfaces";
import ReplyPopUp from "../elements/replyPopup";
import { serverUrl } from "../../env";
import { useNavigate } from "react-router-dom";
import NotifyPopup from "../elements/new_message";

const ContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { setUserCred } = useUserContext();
  const router = useNavigate();

  useEffect(() => {
    async function getCred() {
      const response = await fetch(`${serverUrl}/api/loginCred`, {
        method: "GET",
        credentials: "include",
      });

      const res = (await response.json()) as AuthResponseConfig;
      console.log(res);
      if (res && res.status == 200) {
        setUserCred(res.userCred);
      } else {
        router("/auth/login");
      }
    }
    getCred();
  }, []);

  return (
    <>
      <ReplyPopUp />
      <NotifyPopup />
      {children}
    </>
  );
};

export default ContextWrapper;
