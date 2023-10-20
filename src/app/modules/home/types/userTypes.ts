

export interface User {
  username: string;
  _id: string;
}

export interface Room<T> {
  host: string;
  users: T;
  _id: string;
}
