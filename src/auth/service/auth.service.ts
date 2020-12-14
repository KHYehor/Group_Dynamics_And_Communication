import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  signIn(body): Object {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const data1 = global.UsersByLogin[body.login];
    if (!data1) return 'Wrong login';
    const data2 = data1[body.password];
    if (!data2) return 'Wrong password';

    const accessToken = this.jwtService.sign(data1, {
      secret: 'secret', // unique access secret from environment vars
      expiresIn: '10d', // unique access expiration from environment vars
    });

    const refreshToken = this.jwtService.sign(data1, {
      secret: 'secret', // unique refresh secret from environment vars
      expiresIn: '30d', // unique refresh expiration from environment vars
    });
    console.log({
      accessToken,
      refreshToken
    });
    return {
      accessToken,
      refreshToken
    };
  }
}
