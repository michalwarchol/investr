import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Tag } from './tags.entity';

import { ITagCreateProps } from './tags.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  async find(options: FindManyOptions<Tag>): Promise<Tag[]> {
    return this.tagsRepository.find(options);
  }

  async findAll(): Promise<Tag[]> {
    return this.tagsRepository.find();
  }

  async create(props: ITagCreateProps): Promise<Tag> {
    const tag = this.tagsRepository.create(props);
    this.tagsRepository.save(tag);

    return tag;
  }
}
