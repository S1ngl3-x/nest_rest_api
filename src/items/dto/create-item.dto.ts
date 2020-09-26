import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({
    description: 'This is how item is supposed to be named.',
    default: 'There is no default, sorry boii',
    maxLength: 100,
  })
  readonly name: string;
  // @ApiProperty()
  readonly description: string;
  // @ApiProperty()
  readonly qty: number;
}
