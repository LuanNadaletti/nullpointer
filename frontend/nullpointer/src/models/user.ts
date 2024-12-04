export interface User {
  id: number;
  username: string;
  email: string;
  registrationDate: Date;
}

export interface AuthUser {
  id: number;
  username: string;
}

export interface UserStats {
  questionsCount: number;
  answersCount: number;
}