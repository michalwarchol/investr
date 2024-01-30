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
  url: string | null;
  contact_email: string;
  contact_phone: string;
  tags: string[];
}

export interface IPaginatorProps {
  first: number;
  page: number;
}

export interface IWhereConditions {
  column: string;
  operator: 'eq' | 'not' | 'gte' | 'lte' | 'like';
  value: string | number | boolean;
}

export interface IOrderByConditions {
  column: string;
  order: 'ASC' | 'DESC';
}

export interface IProductSearchProps {
  first: number;
  page: number;
  where: IWhereConditions[];
  orderBy?: IOrderByConditions;
}

export interface IProductsPaginationResponse {
  data: IProductResponse[];
  total: number;
}
