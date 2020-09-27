import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

@Schema()
export class Item extends Document {
  @Prop()
  name: string;

  @Prop()
  qty: number;

  @Prop()
  description: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item).plugin(
  mongoosePaginate,
);
