import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import ChatList from "./ChatList";
import { MainContainer } from "@chatscope/chat-ui-kit-react";

type Props = {
  chatUsers: any[];
};

const ChatMainView = (props: Props) => {
  const { chatUsers } = props;

  useEffect(() => {}, []);

  return (
    <div style={{ position: "relative", height: "500px" }}>
      <MainContainer responsive>
        <ChatList chatUsers={chatUsers} />
        <Outlet />
      </MainContainer>
    </div>
  );
};

export default ChatMainView;
