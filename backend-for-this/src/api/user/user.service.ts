import { Injectable } from '@nestjs/common';
import { ResponseService } from 'src/common-service/response.service';
import { Request, Response } from 'express';
import { User } from 'src/models/UserMasters.entity';

@Injectable()
export class UserService {
  constructor(private responseService: ResponseService) {}

  /**
   * @author Barun Roy
   * @param req
   * @param res
   * @returns a success message
   */

  /**
   * get all users
   * @author Barun Roy
   * @param req
   * @param res
   * @returns
   */

  getUsers = async (req: Request, res: Response) => {
    try {
      let data: object = await User.findAll({
        attributes: ['name', 'user_name', 'email'],
      });
      return this.responseService.sent(res, 200, data);
    } catch (error) {
      return this.responseService.sent(res, 500, [], error.message);
    }
  };
}
