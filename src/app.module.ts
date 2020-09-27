import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ItemsModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: Joi.object({
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get(
          'DATABASE_USER',
        )}:${configService.get(
          'DATABASE_PASSWORD',
        )}@cluster0-2z0ku.mongodb.net/${configService.get(
          'DATABASE_NAME',
        )}?retryWrites=true&w=majority`,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
