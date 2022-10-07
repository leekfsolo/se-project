import React from "react";
import {
  Sidebar,
  Search,
  Conversation,
  ConversationList,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import { useNavigate } from "react-router-dom";

export type LocationState = {
  username: string;
  avatar: string;
};

type Props = {
  chatList: any[];
};

const ChatList = (props: Props) => {
  const { chatList } = props;
  const navigate = useNavigate();
  const navigateTo = (path: string, state?: LocationState) => {
    navigate(path, { replace: false, state });
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
              active={idx === 0}
              onClick={() =>
                navigateTo(chat.chatId, {
                  username: chat.username,
                  avatar: chat.avatar,
                })
              }
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
