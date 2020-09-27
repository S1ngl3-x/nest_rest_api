import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Userdetail } from './schemas/userdetailSchema';
import { PaginateModel } from 'mongoose';
import { CreateUserdetailDto } from './dto/create-userdetail.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Userdetail.name)
    private readonly userdetailPaginateModel: PaginateModel<Userdetail>,
  ) {}

  async create(createUserdetailDto: CreateUserdetailDto): Promise<Userdetail> {
    const createdUserdetail = new this.userdetailPaginateModel(
      createUserdetailDto,
    );
    return createdUserdetail.save();
  }

  async findById(id: string): Promise<Userdetail> {
    // todo fix - this is really bad "nullpointer" solution
    const userdetail = this.userdetailPaginateModel.findOne({ _id: id });
    if (userdetail) return userdetail;
    throw new HttpException('Nonexistent user', HttpStatus.NOT_FOUND);
  }

  async findByEmail(email: string): Promise<Userdetail> {
    return this.userdetailPaginateModel.findOne({ email: email });
  }
}
