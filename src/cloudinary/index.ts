import axios from "axios";
import Config from "../configuration";

export const CloudinaryUpload = (file: File, id: string) => {
  const fd = new FormData();

  fd.append("upload_preset", `${process.env.REACT_APP_UNSIGNED_UPLOAD_PRESET}`);
  fd.append("tags", id);
  fd.append("folder", "Software Engineering");
  fd.append("file", file);

  return axios.post(Config.CloudinaryEndpoint, fd, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
