import React, { useContext, useState, FC, ReactNode } from "react";
import { OutgoingMessagePayload } from "../interfaces";

export interface NotifyContextType {
  notify: notifyType;
  setNotify: React.Dispatch<React.SetStateAction<notifyType>>;
}

export const NotifyContext = React.createContext<NotifyContextType>({
  notify: null,
  setNotify: () => {},
});

interface Props {
  children: ReactNode;
}
export type notifyType = OutgoingMessagePayload | null;

const NotifyHolder: FC<Props> = ({ children }) => {
  const [notify, setNotify] = useState<notifyType>(null);

  return (
    <NotifyContext.Provider value={{ notify, setNotify }}>
      {children}
    </NotifyContext.Provider>
  );
};

export const useNotifyContext = () => useContext(NotifyContext);

export default NotifyHolder;
