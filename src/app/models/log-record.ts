export interface LogRecord {
  userName: string;
  content: string;
  logDate?: Date;
  loginIP?: string;
  logType?: string; // E -error O - operation
  _id?: string; // Record Id in database
}
