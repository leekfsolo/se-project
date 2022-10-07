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
import { DefaultUser } from "../../../assets";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getChatData } from "../chatSlice";
import { useAppDispatch } from "../../../app/hooks";
import { useSelector } from "react-redux";
import { authSelector, chatSelector } from "../../../app/selector";
import { LocationState } from "./ChatList";

const ChatBox = () => {
  const [messageInputValue, setMessageInputValue] = useState("");
  const chatData = useSelector(chatSelector).data;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation().state as { state: LocationState };
  const userId = useSelector(authSelector).auth.id;
  const { chatId = "" } = useParams();

  useEffect(() => {
    dispatch(getChatData(chatId))
      .unwrap()
      .then()
      .catch((e) => {
        navigate("../");
      });
  }, []);

  console.log(state);

  return (
    <ChatContainer>
      <ConversationHeader>
        <ConversationHeader.Back />
        <Avatar src={state.avatar} name={state.username} />
        <ConversationHeader.Content userName={state.username} />
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
