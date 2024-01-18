import { Tag } from 'src/tags/tags.entity';
import { IUserResponse } from 'src/users/users.dto';

export interface IProductResponse {
  id: string;
  name: string;
  description: string;
  goal: number;
  image: string;
  url: string | null;
  contact_email: string;
  contact_phone: string;
  tags: Tag[];
  owner: IUserResponse;
}

export interface IProductCreateProps {
  name: string;
  description: string;
  goal: number;
  image: string;
  url: string | null;
  contact_email: string;
  contact_phone: string;
  tags: string[];
}

export interface IPaginatorProps {
  first: number;
  page: number;
}
