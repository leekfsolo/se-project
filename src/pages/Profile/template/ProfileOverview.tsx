import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BookIcon from "@mui/icons-material/Book";
import Button from "@mui/material/Button";
import ProfileAvatar from "./ProfileAvatar";
import { useTranslation } from "react-i18next";

type Props = {
  username?: string;
  role?: string;
  previewImg: string;
  handleUploadFile: (uploadedFile: File) => void;
  avatar: string;
};

const ProfileOverview = (props: Props) => {
  const { username, role, handleUploadFile, previewImg, avatar } = props;
  const { t } = useTranslation();
  const [overviewOptions, setOverviewOptions] = useState([
    {
      icon: <PersonIcon />,
      label: "Thông tin tài khoản",
      path: "/basic",
      isActive: true,
    },
    {
      icon: <BusinessIcon />,
      label: "Thông tin công ty",
      path: "/company",
      isActive: false,
    },
    {
      icon: <AssignmentIcon />,
      label: "Đơn hàng của tôi",
      path: "/myOrder",
      isActive: false,
    },
    {
      icon: <BookIcon />,
      label: "Sổ địa chỉ",
      path: "/bookAddress",
      isActive: false,
    },
  ]);
  const changeOverviewOption = (label: string) => {
    const newOverviewOptions = overviewOptions.map((option) => {
      option.isActive = label === option.label;

      return option;
    });
    setOverviewOptions(newOverviewOptions);
  };

  return (
    <div className="profile-overview d-flex flex-column align-items-center h-100">
      <div className="profile-overview__avatar">
        <ProfileAvatar
          avatar={avatar}
          username={username}
          previewImg={previewImg}
          handleUploadFile={handleUploadFile}
        />
      </div>
      <h5 className="mb-0 mt-3">{username}</h5>
      <small className="profile-overview__role">{t(`${role}`)}</small>

      <div className="profile-overview__list w-100">
        {overviewOptions.map((option) => (
          <Button
            key={option.label}
            startIcon={option.icon}
            className={`list-item w-100 d-flex ${
              option.isActive ? "list-item--active" : ""
            }`}
            onClick={() => changeOverviewOption(option.label)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProfileOverview;
