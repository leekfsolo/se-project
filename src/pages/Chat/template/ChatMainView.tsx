import React from "react";
import { Outlet } from "react-router-dom";
import ChatList from "./ChatList";

type Props = {
  chatUsers: any[];
};

const ChatMainView = (props: Props) => {
  const { chatUsers } = props;

  return (
    <div className="chat h-100">
      <div className="container-fluid p-0 h-100">
        {chatUsers && (
          <div className="row m-0 h-100">
            <div className="col-1 col-md-3 h-100 p-0">
              <ChatList chatUsers={chatUsers} />
            </div>
            <div className="col p-0">
              <Outlet />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMainView;
