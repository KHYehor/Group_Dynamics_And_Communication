import { PassportStrategy } from '@nestjs/passport';
import {ExtractJwt, Strategy, VerifiedCallback} from 'passport-jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'JWT_SECRET',
    });
  }

  async validate(payload: any): Promise<any> {
    console.log('there!!!!');
    return payload;
  }
}
