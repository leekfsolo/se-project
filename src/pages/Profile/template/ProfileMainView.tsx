import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { handleLoading } from "../../../app/globalSlice";
import { useAppDispatch } from "../../../app/hooks";
import { authSelector, userSelector } from "../../../app/selector";
import { CloudinaryUpload } from "../../../cloudinary";
import customToast, {
  ToastType,
} from "../../../components/CustomToast/customToast";
import NotifyPopup from "../../../components/NotifyPopup";
import { getBase64 } from "../../../utils/helpers/getBase64";
import { matchStringAfterWord } from "../../../utils/regex";
import { updateUserAvatar } from "../userSlice";
import ProfileDetail from "./ProfileDetail";
import ProfileOverview from "./ProfileOverview";

const ProfileMainView = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string>("");
  const user = useSelector(userSelector);
  const authStore = useSelector(authSelector);
  const { role, avatar } = user;
  const { info: data, auth } = authStore;
  const { id: userId } = auth;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleUploadFile = (file: File) => {
    setUploadedFile(file);
    getBase64(file).then((result: string) => setPreviewImg(result));
  };

  const handleSaveChanges = (isSave: boolean = false) => {
    if (isSave && uploadedFile) {
      dispatch(handleLoading(true));
      CloudinaryUpload(uploadedFile, userId).then(async (result) => {
        const regex = matchStringAfterWord("upload");
        const matchUrl = result.data.url.match(regex);

        if (matchUrl) {
          const uploadResponse: any = await dispatch(
            updateUserAvatar({ userId, url: matchUrl[0] })
          ).unwrap();
          const { success, message } = uploadResponse;
          const msgValue = t(`${message}`);
          if (success) {
            customToast(ToastType.SUCCESS, msgValue);
          } else {
            customToast(ToastType.ERROR, msgValue);
          }
        }
      });
      dispatch(handleLoading(false));
    }
    setUploadedFile(null);
    setPreviewImg("");
  };

  const profileOverviewProps = {
    username: data?.username,
    role,
    previewImg,
    handleUploadFile,
    avatar,
  };

  return (
    <div className="profile">
      <NotifyPopup toggle={!!uploadedFile} handleSaveFunc={handleSaveChanges} />
      <div className="container-fluid h-100">
        {data && (
          <div className="row m-0 p-0 h-100">
            <div className="col-3">
              <ProfileOverview {...profileOverviewProps} />
            </div>
            <div className="col">
              <ProfileDetail data={data} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileMainView;
