import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  ConversationHeader,
  TypingIndicator,
  EllipsisButton,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import { DefaultUser } from "../../../assets";
import { useNavigate, useParams } from "react-router-dom";
import { getChatData } from "../chatSlice";
import { useAppDispatch } from "../../../app/hooks";
import { useSelector } from "react-redux";
import { chatSelector } from "../../../app/selector";

const ChatBox = () => {
  const [messageInputValue, setMessageInputValue] = useState("");
  const chatData = useSelector(chatSelector).data;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { chatId = "" } = useParams();

  useEffect(() => {
    dispatch(getChatData(chatId))
      .unwrap()
      .catch((e) => {
        navigate("../");
      });
  }, []);

  return (
    <ChatContainer>
      <ConversationHeader>
        <ConversationHeader.Back />
        <Avatar src={DefaultUser} name="Zoe" />
        <ConversationHeader.Content userName="Zoe" />
        <ConversationHeader.Actions>
          <EllipsisButton orientation="vertical" />
        </ConversationHeader.Actions>
      </ConversationHeader>
      <MessageList></MessageList>
      <MessageInput
        placeholder="Type message here"
        value={messageInputValue}
        onChange={(val) => setMessageInputValue(val)}
      />
    </ChatContainer>
  );
};

export default ChatBox;
