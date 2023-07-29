import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './api/user/user.module';
import { ResponseService } from './common-service/response.service';
import { JwtService } from '@nestjs/jwt';
import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppRoutingModule } from './app.routing.module';
import { TransactionInterceptor } from './interceptors/transaction.interceptor';
import { MODELS } from './models';
// import { EnvironmentVariables } from './interfaces/app.module.interface';

let _ENV = dotenv.config().parsed;

let CONNECTION: any = {
  dialect: _ENV['DB_DIALECT'],
  host: _ENV['DB_HOST'],
  port: _ENV['DB_PORT'],
  username: _ENV['DB_USER'],
  password: _ENV['DB_PASS'],
  database: _ENV['DB_NAME'],
  models: MODELS,
  logging: false,
  //autoLoadModels: true,
  // synchronize: true,
  dialectOptions: {
    useUTC: false,
    dateStrings: true,
    typeCast: function (field: any, next: any) {
      if (field.type === 'DATETIME') {
        return field.string();
      }
      return next();
    },
  },
  pool: {
    handleDisconnects: true,
    max: 10000,
    min: 1,
    acquire: 1200000,
    idle: 1000000,
  },
  timezone: '+05:30',
};

let MODULES = [SequelizeModule.forRoot(CONNECTION), AppRoutingModule];

MODULES = [...MODULES];

@Module({
  imports: MODULES,
  controllers: [AppController],
  providers: [
    ResponseService,
    AppService,
    TransactionInterceptor,
    { provide: 'SEQUELIZE', useExisting: Sequelize },
  ],
})
export class AppModule {}
