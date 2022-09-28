import environmentConfig from "./environmentConfig";
import { storageKey } from "./storageKey";

const isDevEnv =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";
const envConfig = isDevEnv
  ? environmentConfig.development
  : environmentConfig.production;

const CloudinaryEndpoint = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`;
const CloudinaryImageUrl = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUD_NAME}/image/upload`;

const Config = {
  isDevEnv,
  storageKey,
  apiConfig: {
    ...envConfig,
  },
  CloudinaryEndpoint,
  CloudinaryImageUrl,
};

export default Config;
