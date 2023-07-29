import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from 'dotenv';

let env: any = config().parsed;

type JwtPayload = {
  userId: number;
  email: string;
  roleId: number;
};

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env['JWT_ACCESS'],
    });
  }

  validate = (payload: JwtPayload) => {
    return payload;
  };
}
