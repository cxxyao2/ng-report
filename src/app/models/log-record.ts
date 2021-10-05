export interface LogRecord {
  createUser: string; // = user._id
  userName: string;
  content: string;
  createDate?: Date;
  ip: string;
  _id: string;
}
