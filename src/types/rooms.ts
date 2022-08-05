type UserInRoom = {
  userId: string,
  userName: string,
  online: boolean
}

export type ActiveRoom = {
  _id: string;
  roomName: string;
  users: UserInRoom[];
  active: boolean;
  owner: string;
}