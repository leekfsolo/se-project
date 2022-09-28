import React, { ChangeEvent, useState } from "react";

import { Avatar } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

type Props = {
  avatar: string;
  username?: string;
  previewImg: string;
  handleUploadFile: (uploadedFile: File) => void;
};

const ProfileAvatar = (props: Props) => {
  const { username = "user", handleUploadFile, previewImg, avatar } = props;
  const [isHoverAvatar, setIsOverAvatar] = useState<boolean>(false);

  const dropFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;

    if (files) {
      const newFile = files[0];
      if (newFile) {
        if (newFile.size > 2000000) {
          alert("Exceeds the upload max file size!!!");
          return;
        }

        handleUploadFile(newFile);
      }
    }
  };

  return (
    <div
      className="avatar-container w-100 h-100"
      onMouseEnter={() => setIsOverAvatar(true)}
      onMouseLeave={() => setIsOverAvatar(false)}
    >
      <div
        className={`avatar-backdrop ${
          isHoverAvatar ? "avatar-backdrop--active" : ""
        }`}
      ></div>
      <Avatar
        alt={username}
        src={previewImg !== "" ? previewImg : avatar}
        sx={{ width: "100%", height: "100%" }}
        className="avatar-image"
      />
      <AddPhotoAlternateIcon className="avatar-add-icon" />
      <input
        type="file"
        name="avatar"
        id="avatar"
        className="avatar-input"
        onChange={(e) => dropFileHandler(e)}
        accept=".png, .jpg, .jpeg"
      />
    </div>
  );
};

export default ProfileAvatar;
