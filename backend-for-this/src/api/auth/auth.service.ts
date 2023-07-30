import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';
import { Request, Response } from 'express';
import { ResponseService } from 'src/common-service/response.service';
import { TokenPayload, Tokens } from './types';
import { Op, Transaction, where } from 'sequelize';
import { UserDto } from '../user/dto';
import helpers from 'src/helpers';
import { AuthDto } from './dto';
import { token } from 'morgan';
import { User } from 'src/models/UserMasters.entity';

let env = config().parsed;

@Injectable()
export class AuthService {
  constructor(
    private responseService: ResponseService,
    private jwtService: JwtService,
  ) {}

  getTokens = async (payload: TokenPayload): Promise<Tokens> => {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: 60 * 15,
      secret: env['JWT_ACCESS'],
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: 60 * 60 * 24 * 7,
      secret: env['JWT_REFRESH'],
    });
    return { access_tokens: accessToken, refresh_tokens: refreshToken };
  };

  signup = async (
    transaction: Transaction,
    dto: UserDto,
    req: Request,
    res: Response,
  ): Promise<Tokens | void> => {
    try {
      let user_name: string = dto?.name.toLowerCase().split(' ').join('_');

      let duplicateCheckfilterObject: object = {
        attributes: ['id'],
        where: { [Op.or]: [{ email: dto?.email }, { user_name }] },
      };

      let duplicateCheck: object = await User.findOne(
        duplicateCheckfilterObject,
      );
      if (duplicateCheck) {
        return this.responseService.sent(res, 409, [], 'User already exists!');
      }

      let hashedPassword: string = await helpers.hashData(dto?.password);

      const newUser = await User.create(
        {
          name: dto?.name,
          user_name: user_name,
          email: dto?.email,
          password: hashedPassword,
          role_id: 3,
          temp_password: 1,
        },
        { transaction },
      );

      // console.log('newUser', JSON.parse(JSON.stringify(newUser)));

      const token = await this.getTokens({
        userId: newUser.id,
        email: newUser.email,
        roleId: newUser.role_id,
      });
      // console.log('token', token);

      const hashedRefreshTokens = await helpers.updateRefreshTokenHash(
        token.refresh_tokens,
      );

      // console.log('hashedRefreshTokens', hashedRefreshTokens);

      const updateHash = await User.update(
        { hashed_refresh_token: hashedRefreshTokens },
        { where: { id: newUser.id }, transaction },
      );

      return this.responseService.sent(
        res,
        201,
        token,
        'User Successfully Registered',
      );
    } catch (error: any) {
      // console.log(error);
      // await transaction.rollback();
      return this.responseService.sent(res, 500, [], error.message);
    }
  };

  /**
   * user login/signin
   * @author Barun Roy
   * @param req
   * @param res
   * @returns
   */

  signin = async (
    dto: AuthDto,
    req: Request,
    res: Response,
  ): Promise<Tokens | void> => {
    try {
      let whereCondition: any = {};

      dto?.user_name && (whereCondition.user_name = dto.user_name);

      let user = await User.findOne({
        where: whereCondition,
        attributes: ['id', 'email', 'role_id', 'password'],
      });

      if (
        user &&
        (await helpers.compareHashData(user?.password, dto?.password))
      ) {
        var token = await this.getTokens({
          userId: user.id,
          email: user.email,
          roleId: user.role_id,
        });
      } else {
        return this.responseService.sent(
          res,
          401,
          [],
          'Wrong credentials! Access denied',
        );
      }

      user = JSON.parse(JSON.stringify(user));

      delete user.password;

      const data: any = {
        user,
        token,
      };

      const hashedRefreshTokens = await helpers.updateRefreshTokenHash(
        token.refresh_tokens,
      );

      const updateHash = await User.update(
        { hashed_refresh_token: hashedRefreshTokens },
        { where: { id: user.id } },
      );

      return this.responseService.sent(
        res,
        200,
        {
          user,
          token,
        },
        'User successfully logged in',
      );
    } catch (error) {
      console.log('error', error);
      return this.responseService.sent(res, 500, error.message);
    }
  };

  /**
   * user logout
   * @author Barun Roy
   * @param req
   * @param res
   * @returns
   */

  logout = async (req: Request, res: Response) => {
    try {
      let authToken: any = req.user;
      let userId: number = authToken.userId;
      await User.update(
        { hashed_refresh_token: null },
        { where: { id: userId, hashed_refresh_token: { [Op.ne]: null } } },
      );
      res.removeHeader('authorization');
      return this.responseService.sent(
        res,
        200,
        [],
        'User logged out successfully',
      );
    } catch (error) {
      return this.responseService.sent(res, 500, []);
    }
  };

  /**
   * will be used to refresh the access token to maintain loggedin state
   * @author Barun Roy
   * @param req
   * @param res
   * @returns
   */

  refreshToken = async (req: Request, res: Response) => {
    try {
    } catch (error) {
      return this.responseService.sent(res, 500, []);
    }
  };
}
