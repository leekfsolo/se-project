import React, { useEffect, useState } from "react";

import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  ConversationHeader,
  EllipsisButton,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { useSelector } from "react-redux";
import { authSelector } from "../../../app/selector";
import { HubConnection } from "@microsoft/signalr";
import { HubConnectionBuilder } from "@microsoft/signalr/dist/esm/HubConnectionBuilder";
import Config from "../../../configuration";
import { LogLevel } from "@microsoft/signalr/dist/esm/ILogger";
import { IChatMessage } from "../interface";
import { handleLoading } from "../../../app/globalSlice";
import dayjs from "dayjs";
import { useGetChatDataQuery } from "../chatSlice";

const ChatBox = () => {
  const [messageInputValue, setMessageInputValue] = useState<string>("");
  const [hubConnection, setHubConnection] = useState<HubConnection | null>();
  const [messageConnection, setMessageConnection] = useState<
    Array<IChatMessage>
  >([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userId = useSelector(authSelector).auth.id;
  const { chatId = "" } = useParams();
  const { data: chatData, isSuccess } = useGetChatDataQuery(chatId);

  const sendMessageHandler = async () => {
    if (hubConnection) {
      try {
        await hubConnection.invoke("SendMessage", messageInputValue);
      } catch (e) {
        console.error(e);
      }
    }
    setMessageInputValue("");
  };

  useEffect(() => {
    if (hubConnection) {
      hubConnection.stop();
    }

    try {
      (async () => {
        dispatch(handleLoading(true));
        // await dispatch(getChatData(chatId)).unwrap();

        const connection = new HubConnectionBuilder()
          .withUrl(`${Config.apiConfig.endPoint}/hub`)
          .configureLogging(LogLevel.Information)
          .build();

        connection.on("ReceiveMessage", (userId, avatar, message) => {
          setMessageConnection((prevMessages) => {
            const newMessage: IChatMessage = {
              avatar: Config.CloudinaryImageUrl + avatar,
              userId,
              content: message,
            };
            return [...prevMessages, newMessage];
          });
        });

        connection.onclose((e) => {
          setHubConnection(null);
          setMessageConnection([]);
        });

        await connection.start();
        await connection.invoke("JoinRoom", { userId, chatId });
        setHubConnection(connection);
        dispatch(handleLoading(false));
      })();
    } catch (e) {
      console.log(e);
      navigate("../");
    }
  }, [chatId]);

  return isSuccess ? (
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
      <MessageList
        scrollBehavior="smooth"
        autoScrollToBottom={true}
        className="py-2"
      >
        {chatData.messages.length > 0 && (
          <MessageSeparator as="h2">
            {`${dayjs(chatData.messages[0].created).format(
              "MMM DD, YYYY hh:mm A"
            )}`}
          </MessageSeparator>
        )}
        {chatData.messages.map((msg) => (
          <Message
            key={msg.message_id}
            model={{
              message: msg.content,
              direction: msg.userId === userId ? "outgoing" : "incoming",
              position: "single",
              sentTime: msg.created,
            }}
            avatarSpacer={!(msg.avatar !== "")}
          >
            {msg.avatar !== "" && <Avatar src={msg.avatar} name="avatar" />}
          </Message>
        ))}
        {messageConnection.map((msg) => (
          <Message
            key={msg.message_id}
            model={{
              message: msg.content,
              direction: msg.userId === userId ? "outgoing" : "incoming",
              position: "single",
            }}
            avatarSpacer={!(msg.avatar !== "")}
          >
            {msg.avatar !== "" && <Avatar src={msg.avatar} name="avatar" />}
          </Message>
        ))}
      </MessageList>
      <MessageInput
        placeholder="Type message here"
        value={messageInputValue}
        onChange={(val) => setMessageInputValue(val)}
        onSend={sendMessageHandler}
        fancyScroll={true}
      />
    </ChatContainer>
  ) : (
    <div></div>
  );
};

export default ChatBox;
