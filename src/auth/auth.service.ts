import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserdetailDto } from '../users/dto/create-userdetail.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './interfaces/tokenPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(
    registerUserdetailDto: CreateUserdetailDto,
  ): Promise<CreateUserdetailDto> {
    const hashedPassword = await bcrypt.hash(
      registerUserdetailDto.password,
      10,
    );

    try {
      const createdUser = await this.usersService.create({
        ...registerUserdetailDto,
        password: hashedPassword,
      });

      delete registerUserdetailDto.password;

      return createdUser;
    } catch (e) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.findByEmail(email);

      await this.verifyPassword(plainTextPassword, user.password);

      delete user.password;
      return user;
    } catch (e) {
      throw new HttpException('Wrong credentials', HttpStatus.BAD_REQUEST);
    }
  }

  getCookieWithJwtToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  getCookieForLogout() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const passwordMatches = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );

    if (!passwordMatches) {
      throw new HttpException('Wrong credentials', HttpStatus.BAD_REQUEST);
    }
  }

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }
  //
  // async login(user: any) {
  //   const payload = { username: user.username, sub: user.userId };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
}
