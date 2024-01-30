import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/constants';
import { Product } from 'src/products/products.entity';

export class IUserResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  role: Role;

  @ApiProperty({ isArray: true })
  products: Product[];
}

export interface IUserCreateProps {
  email: string;
  name: string;
  password: string;
  role: Role;
}
