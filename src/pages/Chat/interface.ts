export interface IChatListResponse {
  success: boolean;
  data: ChatItem[];
}

export interface ChatItem {
  senderId: string;
  receiverId: string;
  chatId: string;
  username: string;
  avatar: string;
  lastMessage: string;
  lastAccessTime: string;
}

export interface IChatDataResponse {
  success: boolean;
  data: IChatData;
}

export interface IChatData {
  chatId: string;
  lastAccessTime: string;
  receiverId: string;
  receiverUsername: string;
  receiverAvatar: string;
  messages: IChatMessage[];
}

export interface IChatMessage {
  content: string;
  message_id?: string;
  userId: string;
  created?: string;
  username?: string;
  avatar: string;
}
