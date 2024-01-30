import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/constants';

export class ISignInResponse {
  @ApiProperty()
  accessToken: string;
}

export class ISignInBody {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class ISignUpBody {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: Role;
}
