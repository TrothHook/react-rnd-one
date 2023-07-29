import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ResponseService } from 'src/common-service/response.service';
import { Role } from 'src/models/RoleMasters.entity';
import { User } from 'src/models/UserMasters.entity';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { Request, Response } from 'express';

let env: any = config().parsed;

@Injectable()
export class AuthService {
  constructor(
    private responseService: ResponseService,
    private jwtService: JwtService,
  ) {}

  /**
   * validate user
   * @author Barun Roy
   * @param username
   * @param password
   * @returns user without the password and role id and role name as well
   */
  validateUser = async (username: string, password: string): Promise<any> => {
    let filter: any = {};
    filter = {
      include: [
        {
          model: Role,
          attributes: ['id', 'role_name'],
        },
      ],
      where: {
        user_name: username,
      },
    };
    let user = await User.findOne(filter);
    let isMatch: any = false;
    if (user) isMatch = await bcrypt.compare(password, user?.password);
    if (user && isMatch) {
      delete user.password;
      return user;
    } else {
      return 401;
    }
  };

  /**
   * access token generate
   * @author Barun Roy
   * @param user
   * @returns the access token
   */

  accessToken: any = async (user: any) => {
    return {
      access_token: this.jwtService.signAsync(user, {
        secret: env.JWT_SECRET,
        expiresIn: 24 * 60 * 15,
      }),
    };
  };

  /**
   * refresh token generate
   * @author Barun Roy
   * @param user
   * @returns the refresh token
   */
  refreshToken: any = async (user: any) => {
    let refresh_token = await this.jwtService.signAsync(user, {
      secret: env.JWT_REFERSH_SECRET,
      expiresIn: (24 * 60) & 15,
    });
    return refresh_token;
  };

  /**
   * verify the access token
   * @author Barun Roy
   * @param req
   * @param res
   * @param token
   * @returns after token verification, return the result
   */

  verifyAccessToken: any = async (
    req: Request,
    res: Response,
    token: string,
  ) => {
    try {
      let verified: any = await this.jwtService.verifyAsync(token, {
        secret: env.JWT_SECRET,
        ignoreExpiration: false,
      });
      return this.responseService.sent(res, 200, verified);
    } catch (error) {
      throw UnauthorizedException;
    }
  };

  /**
   * verify the refresh token
   * @author Barun Roy
   * @param token
   * @returns object containing the payload iat and exp
   */

  verifyRefreshToken: object = async (token: string) => {
    let verified: object = await this.jwtService.verifyAsync(token, {
      secret: env.JWT_REFERSH_SECRET,
      ignoreExpiration: false,
    });
    return verified;
  };
}
