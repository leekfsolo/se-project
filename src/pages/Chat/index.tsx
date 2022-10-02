import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { authSelector, chatSelector } from "../../app/selector";
import MainLayout from "../../components/MainLayout";
import { getChatUsers } from "./chatSlice";
import ChatMainView from "./template/ChatMainView";

const Chat = () => {
  const dispatch = useAppDispatch();
  const chatUsers = useSelector(chatSelector).users;
  const userId = useSelector(authSelector).auth.id;

  useEffect(() => {
    dispatch(getChatUsers(userId));
  }, []);

  return (
    <MainLayout>
      <ChatMainView chatUsers={chatUsers} />
    </MainLayout>
  );
};

export default Chat;
