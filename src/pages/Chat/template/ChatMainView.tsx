import React, { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import ChatList from "./ChatList";
import { MainContainer } from "@chatscope/chat-ui-kit-react";

type Props = {
  chatList: any[];
};

const ChatMainView = (props: Props) => {
  const { chatList } = props;
  const navigate = useNavigate();
  const { chatId = "" } = useParams();

  useEffect(() => {
    if (chatId === "" && chatList.length > 0) {
      navigate(chatList[0].chatId);
    }
  }, [chatList]);

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
