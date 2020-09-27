import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult } from 'mongoose';
import { Item } from './schemas/item.schema';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: PaginateModel<Item>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const createdItem = new this.itemModel(createItemDto);
    return createdItem.save();
  }

  // async findAll(): Promise<Item[]> {
  //   return this.itemModel.find().exec();
  // }

  async findAll(page = 1, limit = 10): Promise<PaginateResult<Item>> {
    const options = {
      page: Number(page),
      limit: Number(limit),
    };
    return this.itemModel.paginate({}, options);
  }

  async findOne(id: string): Promise<Item> {
    return this.itemModel.findOne({ _id: id });
  }

  async update(id: string, createItemDto: CreateItemDto): Promise<Item> {
    return this.itemModel.findByIdAndUpdate(id, createItemDto, { new: true });
  }

  async delete(id: string): Promise<Item> {
    return this.itemModel.findByIdAndRemove(id);
  }
}
