import { Role } from 'src/constants';

export interface IUserResponse {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface IUserCreateProps {
  email: string;
  name: string;
  password: string;
  role: Role;
}
