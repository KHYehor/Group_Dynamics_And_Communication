export type ITeacher = {
    rating: number, //teacher's rating
    avatar?: string,
    username: string,
    id: string,
  };
export type ITeachers = Array<ITeacher>;

export type IResponseDataTeachers = ITeachers;
export type IResponseDataTeacherRating = number;
export type IResponseDataFacultyTeachers = ITeachers;
export type IResponseDataDeleteFacultyTeacher = boolean;
export type IResponseDataAddFacultyTeacher = boolean;
