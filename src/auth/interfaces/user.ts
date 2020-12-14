enum role {
  admin,
  student,
  teacher
}

export interface IJWTUser {
  userId: number;
  role: role
}
