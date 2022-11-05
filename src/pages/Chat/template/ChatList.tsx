import React from "react";
import {
  Sidebar,
  Search,
  Conversation,
  ConversationList,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../../../app/selector";
import { ChatItem } from "../interface";

type Props = {
  chatList?: ChatItem[];
};

const ChatList = (props: Props) => {
  const { chatList = [] } = props;
  const { chatId = "" } = useParams();
  const navigate = useNavigate();
  const navigateTo = (path: string) => {
    navigate(path, { replace: false });
  };
  const userId = useSelector(authSelector).auth.id;

  return (
    <Sidebar position="left" className="chat-list" scrollable={true}>
      <Search placeholder="Search..." />
      <ConversationList
        className="chat-list__container h-100"
        scrollable={true}
      >
        {chatList.map((chat) => (
          <Conversation
            key={chat.chatId}
            name={chat.username}
            info={chat.lastMessage}
            lastSenderName={chat.senderId === userId ? "you" : null}
            className="list-user"
            active={chat.chatId === chatId}
            onClick={() => navigateTo(chat.chatId)}
          >
            <Avatar src={chat.avatar} name={chat.username} status="available" />
          </Conversation>
        ))}
      </ConversationList>
    </Sidebar>
  );
};

export default ChatList;
