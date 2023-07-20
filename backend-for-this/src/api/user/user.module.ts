import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ResponseService } from 'src/common-service/response.service';

@Module({
  controllers: [UserController],
  providers: [ResponseService, UserService]
})
export class UserModule {}
