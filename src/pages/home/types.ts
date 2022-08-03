export type CreateRoom = {
  name: string;
  roomName: string;
  roomPassword: string;
};

export type EnterInRoomType = {
  name: string;
  roomId: string;
  roomPassword: string;
};

export type ChatMessage = {
  userId: string;
  avatar: string;
  name: string;
  message: string;
};

export type ChatType = {
  method: "chat" | "message";
  data: ChatMessage[] | ChatMessage;
};
