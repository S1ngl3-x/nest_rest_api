import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
import { Exclude, Expose } from 'class-transformer';
import { Item } from '../../items/schemas/item.schema';

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true, getters: true },
})
export class Userdetail extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  @Exclude()
  password: string;

  @Prop()
  items: Item;
}

export const UserdetailSchema = SchemaFactory.createForClass(Userdetail).plugin(
  mongoosePaginate,
);
