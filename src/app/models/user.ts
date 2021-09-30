export interface User {
  name: string;
  email: string;
  password?: string;
  _id?: string;
  isFrozen?: boolean; // 0-unlocked 1-locked
  failedCount?: number; // maximum attempts:3;
  isAdmin?: boolean;
  isManager?: boolean;
  isSalesperson?: boolean;
}
