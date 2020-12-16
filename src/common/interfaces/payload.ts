import {IRole} from './role';

export interface IPayload {
    user: {
      id: string;
      role: IRole;
    },
    university: {
      id: string
    }
  }