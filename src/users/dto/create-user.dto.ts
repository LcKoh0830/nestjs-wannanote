import { ApiProperty } from '@nestjs/swagger';
import { Date } from 'mongoose';

export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: Date;
}
