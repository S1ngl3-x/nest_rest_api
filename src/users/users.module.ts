import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Userdetail, UserdetailSchema } from './schemas/userdetailSchema';
import { CreateUserdetailDto } from './dto/create-userdetail.dto';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Userdetail.name, schema: UserdetailSchema },
    ]),
    CreateUserdetailDto, // todo hotfix - this is bad solution, every module should have its own dto
  ],
  providers: [UsersService],
  exports: [UsersService, CreateUserdetailDto],
})
export class UsersModule {}
