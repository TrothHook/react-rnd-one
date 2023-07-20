import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UserModule } from './api/user/user.module'
import { StoreService } from './common-service/store.service';
import { ResponseService } from './common-service/response.service';

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
  imports: [RouterModule.register(ROUTES), UserModule],
  providers: [ResponseService,StoreService],
})
export class AppRoutingModule {}