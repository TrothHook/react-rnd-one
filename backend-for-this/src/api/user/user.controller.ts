import {
  Controller,
  Post,
  Req,
  Res,
  Body,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * @author Barun Roy
   * @param req
   * @param res
   * @returns registers a user and will return a success message
   */

  /**
   * get all users list
   * @author Barun Roy
   * @param req
   * @param res
   * @returns
   */

  @Get('get-users')
  async getUsers(@Req() req: Request, @Res() res: Response) {
    return this.userService.getUsers(req, res);
  }
}
