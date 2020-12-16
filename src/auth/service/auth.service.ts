import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {NOT_FOUND_USER} from '../../common/constants'
import { IRole } from '../../common/interfaces/role';
import {IPayload} from '../../common/interfaces/payload';
import {IResponseDataSignIn, ICurrentUniversity, ICurrentUser, IResponseDataSignOut, IResponseDataRefreshToken} from '../interfaces/response';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  signIn(body): IResponseDataSignIn {
    //here validation body
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const user = global.getUserByLogin(body.login);
    
    if (!user || !user[body.password]) {
        throw new HttpException(NOT_FOUND_USER, HttpStatus.BAD_REQUEST);
    }
    const {university: universityUid} = user;    
     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const university = global.Universities[universityUid];

    const tokenPayload: IPayload = {
      user: {
        id: user.id,
        role: user.role,
      },
      university: {
        id: university.id
      },
    }    

    const accessToken = this.jwtService.sign(tokenPayload, {
      secret: 'secret', // unique access secret from environment vars
      expiresIn: '10d', // unique access expiration from environment vars
    });

    const refreshToken = this.jwtService.sign({}, {
      secret: 'secret', // unique refresh secret from environment vars
      expiresIn: '30d', // unique refresh expiration from environment vars
    });
    //set refresh token to header httponly


    const currentUser: ICurrentUser = {
      id: user.id,
      username: user.username,
      role: user.role
    }
    const currentUniversity: ICurrentUniversity = {
      id: university.id,
      name: university.name,
      preview: university.preview
    }

    return {
      accessToken,
      refreshToken: true,
      user: currentUser,
      university: currentUniversity
    };
  }

  signOut(): IResponseDataSignOut {
    //here delete token from db, from heders
    return true
  }
    // eslint-disable-next-line @typescript-eslint/ban-types
    refreshTokens(token: string): IResponseDataRefreshToken {
      
      //here validation body deviceId
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
   
      const decoded = this.jwtService.decode(token);
          // @ts-ignore
      const {user, university} = decoded;
      const tokenPayload: IPayload = {
        user: {
          id: user.id,
          role: user.role,
        },
        university:{
        id: university.id,
        }
      }    
  
      const accessToken = this.jwtService.sign(tokenPayload, {
        secret: 'secret', // unique access secret from environment vars
        expiresIn: '10d', // unique access expiration from environment vars
      });
  
      const refreshToken = this.jwtService.sign({}, {
        secret: 'secret', // unique refresh secret from environment vars
        expiresIn: '30d', // unique refresh expiration from environment vars
      });
      //set refresh token to header httponly
  
  
      return {
        accessToken,
        refreshToken: true,
      };
    }
    
}
