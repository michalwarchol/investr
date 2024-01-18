import { Role } from 'src/constants';
import { Product } from 'src/products/products.entity';

export interface IUserResponse {
  id: string;
  email: string;
  name: string;
  role: Role;
  products: Product[];
}

export interface IUserCreateProps {
  email: string;
  name: string;
  password: string;
  role: Role;
}
