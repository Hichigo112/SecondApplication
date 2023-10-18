export interface User {
  username: string;
  _id: string;
}

export interface Room {
  host: string;
  users: string[];
  _id: string;
}
