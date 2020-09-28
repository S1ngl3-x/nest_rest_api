import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { Item } from './schemas/item.schema';
import { PaginateResult } from 'mongoose';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExceptionLoggerFilter } from '../utils/exceptionFilters/exceptionLogger.filter';
import { FindOneParams } from '../utils/validators/findOneParams';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createItemDto: CreateItemDto) {
    await this.itemsService.create(createItemDto);
  }

  // @Get()
  // async findAll(): Promise<Item[]> {
  //   return this.itemsService.findAll();
  // }

  @Get()
  async findAll(): Promise<PaginateResult<Item>> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  @UseFilters(ExceptionLoggerFilter) // explicitly select filter to be used
  async findOne(@Param() { id }: FindOneParams): Promise<Item> {
    return this.itemsService.findOne(id);
  }

  @Put(':id')
  update(@Body() updateItemDto: CreateItemDto, @Param('id') id): Promise<Item> {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Item> {
    return this.itemsService.delete(id);
  }
}
