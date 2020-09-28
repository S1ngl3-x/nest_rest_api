import { NotFoundException } from '@nestjs/common';

export class ItemNotFoundException extends NotFoundException {
  constructor(itemId: string) {
    super(`Item with id ${itemId} not found`);
  }
}
