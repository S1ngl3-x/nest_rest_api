import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
  Res,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  Header,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserdetailDto } from '../users/dto/create-userdetail.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { RequestWithUserdetail } from './interfaces/requestWithUserdetail.interface';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Userdetail } from '../users/schemas/userdetailSchema';

@Controller('auth')
// @UseInterceptors(ClassSerializerInterceptor) // add serializer per controller
// @SerializeOptions({ strategy: 'excludeAll' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registrationData: CreateUserdetailDto) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: RequestWithUserdetail): Promise<Userdetail> {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user._id);
    request.res.setHeader('Set-Cookie', cookie);
    // todo remove all delete user.password
    // user.password = undefined;
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(
    @Req() request: RequestWithUserdetail,
    @Res() response: Response,
  ) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogout());
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthGuard)
  @Get('authenticate')
  authenticate(@Req() request: RequestWithUserdetail) {
    const user = request.user;
    delete user.password;
    return user;
  }
}
