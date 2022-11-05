import React, { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import ChatList from "./ChatList";
import { MainContainer } from "@chatscope/chat-ui-kit-react";
import { PageUrl } from "../../../configuration/enum";
import { useGetChatListQuery } from "../chatSlice";

type Props = {};

const ChatMainView = (props: Props) => {
  const navigate = useNavigate();
  const { chatId = "" } = useParams();
  const { data: chatList } = useGetChatListQuery();

  useEffect(() => {
    if (chatList && chatList.length > 0) {
      const firstChatId = chatList[0].chatId;
      if (chatId === "") {
        navigate(firstChatId);
      } else {
        console.log(`../${firstChatId}`);
        navigate(`../${PageUrl.CHAT}/${firstChatId}`);
      }
    }
  }, [chatList]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <MainContainer responsive>
        <ChatList chatList={chatList} />
        <Outlet />
      </MainContainer>
    </div>
  );
};

export default ChatMainView;
