import { Controller, Get } from '@nestjs/common';
import { TagsService } from './tags.service';
import { ITagResponse } from './tags.dto';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  findAll(): Promise<ITagResponse[]> {
    return this.tagsService.findAll();
  }
}
