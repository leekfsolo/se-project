import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import ChatList from "./ChatList";
import { MainContainer } from "@chatscope/chat-ui-kit-react";

type Props = {
  chatList: any[];
};

const ChatMainView = (props: Props) => {
  const { chatList } = props;

  useEffect(() => {}, []);

  return (
    <div style={{ position: "relative", height: "500px" }}>
      <MainContainer responsive>
        <ChatList chatList={chatList} />
        <Outlet />
      </MainContainer>
    </div>
  );
};

export default ChatMainView;
