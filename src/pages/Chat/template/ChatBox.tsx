import React, { useEffect, useState } from "react";

import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  ConversationHeader,
  EllipsisButton,
} from "@chatscope/chat-ui-kit-react";
import { useNavigate, useParams } from "react-router-dom";
import { getChatData } from "../chatSlice";
import { useAppDispatch } from "../../../app/hooks";
import { useSelector } from "react-redux";
import { authSelector, chatSelector } from "../../../app/selector";

const ChatBox = () => {
  const [messageInputValue, setMessageInputValue] = useState("");
  const chatData = useSelector(chatSelector).data;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userId = useSelector(authSelector).auth.id;
  const { chatId = "" } = useParams();

  useEffect(() => {
    dispatch(getChatData(chatId))
      .unwrap()
      .then()
      .catch((e) => {
        navigate("../");
      });
  }, [chatId]);

  return (
    <ChatContainer>
      <ConversationHeader>
        <ConversationHeader.Back />
        <Avatar
          src={chatData.receiverAvatar}
          name={chatData.receiverUsername}
        />
        <ConversationHeader.Content userName={chatData.receiverUsername} />
        <ConversationHeader.Actions>
          <EllipsisButton orientation="vertical" />
        </ConversationHeader.Actions>
      </ConversationHeader>
      <MessageList>
        {chatData.messages.map((msg) => {
          const isHavingAvatar = msg.avatar !== "";
          return (
            <Message
              model={{
                message: msg.content,
                direction: msg.userId === userId ? "outgoing" : "incoming",
                position: "single",
              }}
              key={msg.message_id}
              avatarSpacer={!isHavingAvatar}
            >
              {isHavingAvatar && <Avatar src={msg.avatar} name="avatar" />}
            </Message>
          );
        })}
      </MessageList>
      <MessageInput
        placeholder="Type message here"
        value={messageInputValue}
        onChange={(val) => setMessageInputValue(val)}
      />
    </ChatContainer>
  );
};

export default ChatBox;
