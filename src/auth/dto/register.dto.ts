import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  mobile_number: string;
}
