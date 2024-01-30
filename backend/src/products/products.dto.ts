import { ApiProperty } from '@nestjs/swagger';
import { ITagResponse } from 'src/tags/tags.dto';
import { IUserResponse } from 'src/users/users.dto';

export class IProductResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  goal: number;

  @ApiProperty()
  image: string;

  @ApiProperty()
  url: string | null;

  @ApiProperty()
  contact_email: string;

  @ApiProperty()
  contact_phone: string;

  @ApiProperty({ isArray: true, type: ITagResponse })
  tags: ITagResponse[];

  @ApiProperty({ type: IUserResponse })
  owner: IUserResponse;
}

export class IProductCreateProps {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  goal: number;

  @ApiProperty()
  url: string | null;

  @ApiProperty()
  contact_email: string;

  @ApiProperty()
  contact_phone: string;

  @ApiProperty({ isArray: true })
  tags: string[];
}

export class IPaginatorProps {
  @ApiProperty()
  first: number;

  @ApiProperty()
  page: number;
}

export class IWhereConditions {
  @ApiProperty()
  column: string;

  @ApiProperty()
  operator: 'eq' | 'not' | 'gte' | 'lte' | 'like';

  @ApiProperty()
  value: string | number | boolean;
}

export class IOrderByConditions {
  @ApiProperty()
  column: string;

  @ApiProperty()
  order: 'ASC' | 'DESC';
}

export class IProductSearchProps {
  @ApiProperty()
  first: number;

  @ApiProperty()
  page: number;

  @ApiProperty({ isArray: true, type: IWhereConditions })
  where: IWhereConditions[];

  @ApiProperty()
  orderBy?: IOrderByConditions;
}

export class IProductsPaginationResponse {
  @ApiProperty({ isArray: true, type: IProductResponse })
  data: IProductResponse[];

  @ApiProperty()
  total: number;
}
