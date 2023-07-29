import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { ResponseService } from 'src/common-service/response.service';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    ResponseService,
    AuthService,
    AtStrategy,
    RtStrategy,
  ],
})
export class AuthModule {}
