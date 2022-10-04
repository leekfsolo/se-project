import React from "react";
import {
  Sidebar,
  Search,
  Conversation,
  ConversationList,
  Avatar,
} from "@chatscope/chat-ui-kit-react";

type Props = {
  chatUsers: any[];
};

const ChatList = (props: Props) => {
  const { chatUsers } = props;

  return (
    <Sidebar position="left" className="chat-list" scrollable={true}>
      <Search placeholder="Search..." />
      <ConversationList className="chat-list__container">
        {chatUsers.map((user, idx) => {
          return (
            <Conversation
              key={user.userId}
              name={user.username}
              info=""
              className="list-user"
              active={idx === 0}
            >
              <Avatar
                src={user.avatar}
                name={user.username}
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
