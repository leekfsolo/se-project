import React from "react";
import {
  Sidebar,
  Search,
  Conversation,
  ConversationList,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import { useNavigate, useParams } from "react-router-dom";

type Props = {
  chatList: any[];
};

const ChatList = (props: Props) => {
  const { chatList } = props;
  const { chatId = "" } = useParams();
  const navigate = useNavigate();
  const navigateTo = (path: string) => {
    navigate(path, { replace: false });
  };

  return (
    <Sidebar position="left" className="chat-list" scrollable={true}>
      <Search placeholder="Search..." />
      <ConversationList className="chat-list__container">
        {chatList.map((chat, idx) => {
          return (
            <Conversation
              key={chat.userId}
              name={chat.username}
              info=""
              className="list-user"
              active={chat.chatId === chatId}
              onClick={() => navigateTo(chat.chatId)}
            >
              <Avatar
                src={chat.avatar}
                name={chat.username}
                status="available"
              />
            </Conversation>
          );
        })}
      </ConversationList>
    </Sidebar>
  );
};

export default ChatList;
