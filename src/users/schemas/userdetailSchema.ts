import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

@Schema()
export class Userdetail extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserdetailSchema = SchemaFactory.createForClass(Userdetail).plugin(
  mongoosePaginate,
);
