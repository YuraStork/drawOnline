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
  id: string;
  avatar: string;
  userName: string;
  message: string;
};

export type ChatType = {
  method: "chat" | "message";
  data: ChatMessage[] | ChatMessage;
};
