import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from 'dotenv';
import { MODELS } from 'src/models';
import { AppRoutingModule } from './app.routing.module';
import { TransactionInterceptor } from './interceptors/transaction.interceptor';
import { Sequelize } from 'sequelize-typescript';
import { MailerModule } from '@nestjs-modules/mailer';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserModule } from './api/user/user.module';
import { ResponseService } from './common-service/response.service';
let _ENV = config().parsed;

/**Sequelize connection*/

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

let MAIL_MODULE = [
  MailerModule.forRoot({
    transport: {
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '72fb4631ad25ca',
        pass: '106be0fed8ffa6',
      },
    },
  }),
];

let STATIC_FILE_MODULE = [
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'assets'),
  }),
];

/** MODULE Array */

let MODULES = [SequelizeModule.forRoot(CONNECTION), AppRoutingModule];

MODULES = [...MODULES, ...MAIL_MODULE, ...STATIC_FILE_MODULE];

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
