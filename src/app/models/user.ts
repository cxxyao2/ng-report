export interface User {
  id: string;
  name: string;
  email: string;
  locked: string; // 0-unlocked 1-locked
  password: string;
  numberOfLoginAttempt: number; // maximum attempts:3;
}
