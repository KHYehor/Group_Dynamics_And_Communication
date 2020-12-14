export enum role {
  admin = 'admin',
  student = 'student',
  teacher = 'teacher'
}

export interface IJWTUser {
  userId: number;
  role: role
}
