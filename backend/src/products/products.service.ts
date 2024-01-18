import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Repository } from 'typeorm';
import { Product } from './products.entity';

import { IProductCreateProps, IProductResponse } from './products.dto';
import { UsersService } from 'src/users/users.service';
import { TagsService } from 'src/tags/tags.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,

    @Inject(TagsService)
    private tagsService: TagsService,

    @Inject(UsersService)
    private usersService: UsersService,
  ) {}

  async find(options: FindManyOptions<Product>): Promise<Product[]> {
    return this.productsRepository.find(options);
  }

  async findAll(first: number, page: number): Promise<Product[]> {
    return this.productsRepository.find({
      take: first + 1,
      skip: first * (page - 1),
      relations: {
        owner: true,
        tags: true,
      },
    });
  }

  async findByTagId(
    id: string,
    first: number,
    page: number,
  ): Promise<IProductResponse[]> {
    const productIds = await this.productsRepository
      .createQueryBuilder('product')
      .select('product.id')
      .leftJoin('product.tags', 'tags')
      .where('tags.id=:id', { id })
      .take(first + 1)
      .skip(first * (page - 1))
      .getMany();

    return this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.owner', 'users')
      .leftJoinAndSelect('product.tags', 'tags')
      .where('product.id in (:...ids)', {
        ids: productIds.map((product) => product.id),
      })
      .getMany();
  }

  async create(
    ownerId: string,
    body: IProductCreateProps,
  ): Promise<IProductResponse> {
    const owner = await this.usersService.findOneById(ownerId);
    const tags = await this.tagsService.find({
      where: {
        id: In(body.tags),
      },
    });
    const product = this.productsRepository.create({
      ...body,
      tags,
      owner,
    });

    console.log(product);

    await this.productsRepository.save(product);

    return product;
  }
}
