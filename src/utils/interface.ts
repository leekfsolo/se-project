import { LocaleCode } from "../configuration/enum";

export interface LocaleItem {
  locale: string;
  code: LocaleCode;
  flag: string;
}

export interface IChatMessage {
  content: string;
  message_id?: string;
  userId: string;
  created?: string;
  username?: string;
  avatar: string;
}
