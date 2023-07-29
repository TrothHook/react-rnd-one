import { Controller, Post, Req, Res, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { Request, Response } from 'express';
import { UserDto } from '../user/dto';
import { Tokens } from './types';
import { TransactionParam } from 'src/decorators/transaction-param.decorator';
import { Transaction } from 'sequelize';
import { AuthDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * will register the user
   * @author Barun Roy
   * @param req
   * @param res
   * @returns
   */

  @Post('/api/v1/local/signup')
  async signup(
    @TransactionParam() transaction: Transaction,
    @Body() dto: UserDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Tokens | void> {
    return this.authService.signup(transaction, dto, req, res);
  }

  /**
   * will be used for user login
   * @author Barun Roy
   * @param req
   * @param res
   * @returns
   */

  @Post('/api/v1/local/signin') 
  async signin(
    @Body() dto: AuthDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Tokens | void> {
    return this.authService.signin(dto, req, res);
  }

  /**
   * user logout
   * @author Barun Roy
   * @param req
   * @param res
   * @returns
   */

  @UseGuards(AuthGuard('jwt'))
  @Post('/api/v1/local/logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    return this.authService.logout(req, res);
  }

  /**
   * to refresh the token
   * @author Barun Roy
   * @param req
   * @param res
   * @returns
   */

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/api/v1/local/refresh')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshToken(req, res);
  }
}
