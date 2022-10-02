import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, InputAdornment, TextField } from "@mui/material";
import Config from "../../../configuration";

type Props = {
  chatUsers: any[];
};

const ChatList = (props: Props) => {
  const { chatUsers } = props;

  return (
    <div className="chat-list">
      <div className="w-100 p-3">
        <TextField
          id="input-search-users"
          label="Search users"
          className="chat-list__search w-100"
          inputMode="search"
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className="chat-list__container">
        {chatUsers.map((user) => (
          <div className="list-user p-3">
            <Avatar
              alt="user-avatar"
              src={user.avatar}
              sx={{ width: 48, height: 48 }}
            >
              {user.username.slice(0, 2)}
            </Avatar>
            <div className="list-user__info">
              <div className="info-username">{user.username}</div>
              <div className="info-latestMsg">I am chill bro</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
