import {Body, Controller, Get, Post, Res} from '@nestjs/common';
import { AuthService } from "./service/auth.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() body, @Res() response) {
    console.log('here1');
    // eslint-disable-next-line @typescript-eslint/ban-types
    const token: Object = this.authService.signIn(body);
    console.log('here2');
    return response.send(token);
  }

  @Post('sign-out')
  async signOut(@Res() response) {
    // TODO: delete token from db storage
  }

  @Get('refresh-tokens')
  async refreshTokens(@Res() response) {
    // TODO: get new tokens
  }
}
