import React from "react";
import {
  Sidebar,
  Search,
  Conversation,
  ConversationList,
  Avatar,
} from "@chatscope/chat-ui-kit-react";

type Props = {
  chatList: any[];
};

const ChatList = (props: Props) => {
  const { chatList } = props;

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
