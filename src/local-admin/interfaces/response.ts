export type ILocalAdmin = {
    rating: number, //teacher's rating
    avatar?: string,
    username: string,
    id: string,
    faculties: Array<string>,
  };
export type ILocalAdmins = Array<ILocalAdmin>;
export type IResponseDataLocalAdmins = ILocalAdmins;
export type IResponseDataAddLocalAdmin = boolean;
export type IResponseDataDeleteLocalAdmin = boolean;