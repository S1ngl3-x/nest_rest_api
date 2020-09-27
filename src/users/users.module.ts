import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Userdetail, UserdetailSchema } from './schemas/userdetailSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Userdetail.name, schema: UserdetailSchema },
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
