import React from "react";
import { Outlet } from "react-router-dom";
import ChatUsers from "./ChatUsers";

const ChatMainView = () => {
  return (
    <div className="chat">
      <div className="container-fluid p-0 h-100">
        <div className="row m-0 h-100">
          <div className="col-1 col-md-3 h-100 p-0">
            <ChatUsers />
          </div>
          <div className="col p-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMainView;
