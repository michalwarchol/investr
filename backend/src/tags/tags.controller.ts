import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TagsService } from './tags.service';
import { ITagResponse } from './tags.dto';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @ApiOkResponse({ status: 200, type: ITagResponse })
  @Get()
  findAll(): Promise<ITagResponse[]> {
    return this.tagsService.findAll();
  }
}
