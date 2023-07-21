import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseService } from 'src/common-service/response.service';
import { User } from 'src/models/UserMasters.entity';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  constructor(private resposneService: ResponseService) {}

  /**
   * User Registration
   * @author Barun Roy
   * @param req
   * @param res
   * @returns message
   */

  async createUser(req: Request, res: Response) {
    try {
      let user_name: any = req.body?.name.toLowerCase().split(' ').join('_');

      let hashedPassword: any = await bcrypt.hash(req.body?.password, 12);

      let duplicateCheck: any = await User.findOne({
        attributes: ['email'],
        where: {
          [Op.or]: [{ email: req.body?.email }, { name: req.body?.name }],
        },
      });
      if (duplicateCheck) {
        return this.resposneService.sent(
          res,
          409,
          [],
          'User already exists, please login!',
        );
      }

      if (!req.body?.name || !req.body?.email || !req.body?.password) {
        return this.resposneService.sent(
          res,
          400,
          [],
          'Fields cannot be empty',
        );
      }

      await User.create({
        name: req.body?.name,
        user_name: user_name,
        email: req.body?.email,
        password: hashedPassword,
        role_id: 3,
      });
      return this.resposneService.sent(
        res,
        200,
        [],
        'User Successfully Registered',
      );
    } catch (error) {
      // console.log(error);
      return this.resposneService.sent(res, 500, []);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
