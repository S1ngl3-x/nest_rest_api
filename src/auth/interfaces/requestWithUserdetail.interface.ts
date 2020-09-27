import { Request } from '@nestjs/common';
import { Userdetail } from '../../users/schemas/userdetailSchema';

export interface RequestWithUserdetail extends Request {
  user: Userdetail;
}
