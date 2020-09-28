import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
import { Userdetail } from '../../users/schemas/userdetailSchema';

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true, getters: true },
})
export class Item extends Document {
  @Prop()
  name: string;

  @Prop()
  qty: number;

  @Prop()
  description: string;

  // @Prop({ type: Types.ObjectId, required: true, ref: Userdetail.name })
  @Prop({ type: Types.ObjectId, ref: 'Userdetail' })
  user: Userdetail;
}

export const ItemSchema = SchemaFactory.createForClass(Item).plugin(
  mongoosePaginate,
);
