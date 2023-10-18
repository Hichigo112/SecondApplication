export type JoinType = {
  data: string,
  user: {
    id: string;
    username: string;
  },
}

export type IsUserJoined = {
  id: string,
  username: string,
  socketId: string,
}

export type SendMessage = {
  data: string;
  room: string;
  user: string;
}

export type GetMessage = {
  audio: string;
  user: string;
}

export type KickUser = {
  data: string;
  user: IsUserJoined
}

export type LeaveUser = {
  data: string;
  user: string;
}
