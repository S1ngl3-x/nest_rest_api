import { Request } from 'express';
import { Userdetail } from '../../users/schemas/userdetailSchema';

export interface RequestWithUserdetail extends Request {
  user: Userdetail;
}
