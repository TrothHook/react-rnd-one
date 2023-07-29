import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ResponseService } from './common-service/response.service';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';

export const ROUTES = [
  {
    path: 'api/v1',
    children: [
      {
        path: 'user',
        module: UserModule,
      },
    ],
  },
];

@Module({
  imports: [RouterModule.register(ROUTES), UserModule, AuthModule],
  providers: [ResponseService],
})
export class AppRoutingModule {}
