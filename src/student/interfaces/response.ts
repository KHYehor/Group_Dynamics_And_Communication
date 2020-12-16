export type IStudent = {
    avatar?: string,
    username: string,
    id: string,
  };
  export type IStudents = Array<IStudent>;

  export type IResponseDataStudents = IStudents;
  export type IResponseDataAddStudent = boolean;
  export type IResponseDataDeleteStudent = boolean;