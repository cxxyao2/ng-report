export interface User {
  id: string;
  name: string;
  email: string;
  isFrozen: boolean; // 0-unlocked 1-locked
  password: string;
  failedCount: number; // maximum attempts:3;
  isAdmin: boolean;
  isManager: boolean;
  isSalesperson: boolean;
}
