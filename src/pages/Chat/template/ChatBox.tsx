import React from "react";
import { Avatar } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import VideocamIcon from "@mui/icons-material/Videocam";
import InfoIcon from "@mui/icons-material/Info";

const ChatBox = () => {
  return (
    <div className="chat-box h-100">
      <div className="chat-box__user p-3 d-flex align-items-center justify-content-between">
        <div className="user-info d-flex align-items-center gap-2">
          <Avatar src="user-avatar" />
          <span>Ken</span>
        </div>

        <div className="user-options d-flex align-items-center gap-4 me-2">
          <PhoneIcon />
          <VideocamIcon />
          <InfoIcon />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
