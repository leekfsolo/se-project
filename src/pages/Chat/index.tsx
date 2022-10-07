import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { chatSelector } from "../../app/selector";
import MainLayout from "../../components/MainLayout";
import { getChatList } from "./chatSlice";
import ChatMainView from "./template/ChatMainView";

const Chat = () => {
  const dispatch = useAppDispatch();
  const chatList = useSelector(chatSelector).chatList;

  useEffect(() => {
    dispatch(getChatList());
  }, []);

  return (
    <MainLayout>
      <ChatMainView chatList={chatList} />
    </MainLayout>
  );
};

export default Chat;
