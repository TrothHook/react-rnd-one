import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from 'dotenv';
import { Request } from 'express';

let env: any = config().parsed;

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env['JWT_REFRESH'],
      //we want to get back the refresh token
      passReqToCallback: true,
    });
  }

  validate = (req: Request, payload: any) => {
    const refreshToken = req.get('authorization').split(' ')[1];
    return {
      ...payload,
      refreshToken,
    };
  };
}
