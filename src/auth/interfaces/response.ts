import { IRole } from "../../common/interfaces/role";

export type ICurrentUniversity = {
    preview: string,
    name: string,
    id: string,
  };
export type ICurrentUser = {
    id: string,
    username: string,
    avatar?: string,
    role: IRole,
  };
export type IResponseDataSignIn = {
    user: ICurrentUser,
    university: ICurrentUniversity,
    accessToken: string,
    refreshToken: boolean,
  };
export type IResponseDataSignOut = boolean;
export type IResponseDataRefreshToken = {
    accessToken: string,
    refreshToken: boolean,
  };