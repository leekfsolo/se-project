import React from "react";
import { Avatar, Button } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import VideocamIcon from "@mui/icons-material/Videocam";
import InfoIcon from "@mui/icons-material/Info";
import SendIcon from "@mui/icons-material/Send";
import dayjs from "dayjs";

const ChatBox = () => {
  const messages = [];

  return (
    <div className="chat-box h-100">
      <div className="chat-box__user p-3 d-flex align-items-center justify-content-between">
        <div className="user-info d-flex align-items-center gap-2">
          <Avatar src="user-avatar" />
          <span>Ken</span>
        </div>

        <div className="user-options d-flex align-items-center gap-2 me-2">
          <div className="user-options__item">
            <PhoneIcon />
          </div>
          <div className="user-options__item">
            <VideocamIcon />
          </div>
          <div className="user-options__item">
            <InfoIcon />
          </div>
        </div>
      </div>

      <div className="chat-box__messages">
        <div className="message-container">
          <div className="message-time text-center">
            {dayjs().format("HH:mm, DD/MM/YYYY")}
          </div>
          <div className="user-message sender">
            <Avatar className="avatar" />
            <div className="message">asdfqwoeifsadfjksa</div>
          </div>
          <div className="user-message receiver">
            <Avatar className="avatar" />
            <div className="message">12343346456</div>
          </div>
        </div>
        <div className="message-input w-100 d-flex align-items-center justify-content-between gap-5">
          <input placeholder="Send message..." className="w-100" />
          <Button className="d-flex align-items-center gap-2 message-send">
            <SendIcon />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
