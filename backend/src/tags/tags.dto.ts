import { ApiProperty } from '@nestjs/swagger';

export class ITagResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export class ITagCreateProps {
  @ApiProperty()
  name: string;
}
