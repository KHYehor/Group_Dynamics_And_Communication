import {Body, Controller, Get, Post, Res, Headers, HttpException, HttpStatus} from '@nestjs/common';
import { NOT_AUTHORIZED } from '../common/constants';
import { IResponseDataRefreshToken, IResponseDataSignIn, IResponseDataSignOut } from './interfaces/response';
import { AuthService } from "./service/auth.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() body, @Res() response) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    // @ts-ignore
    const responseData: IResponseDataSignIn = this.authService.signIn(body);    
    return response.send(responseData);
  }

  @Post('sign-out')
  async signOut(@Res() response) {
    const responseData: IResponseDataSignOut = this.authService.signOut();    
    return response.send(responseData);
  }

  @Post('refresh-tokens')
  async refreshTokens(@Headers('Authorization') token, @Res() response) {
    if(!token) {
      throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
    } 
    const responseData: IResponseDataRefreshToken = this.authService.refreshTokens(token);    
    return response.send(responseData);
  }
}
