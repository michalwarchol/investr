import {
  ForbiddenException,
  NotFoundException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';
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

    await this.productsRepository.save(product);

    return product;
  }

  async update(
    id: string,
    userId: string,
    body: IProductCreateProps,
  ): Promise<IProductResponse> {
    if (!isUUID(id)) {
      throw new NotFoundException();
    }

    const product = await this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.owner', 'users')
      .where('product.id=:id', { id })
      .getOne();

    if (!product) {
      throw new NotFoundException();
    }

    if (product.owner.id !== userId) {
      throw new ForbiddenException();
    }

    const tags = await this.tagsService.find({
      where: {
        id: In(body.tags),
      },
    });

    const newProduct = this.productsRepository.create({
      id,
      ...product,
      ...body,
      tags,
    });

    await this.productsRepository.save(newProduct);

    return newProduct;
  }

  async delete(id: string, userId: string): Promise<boolean> {
    if (!isUUID(id)) {
      throw new NotFoundException();
    }

    const product = await this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.owner', 'users')
      .where('product.id=:id', { id })
      .getOne();

    if (!product) {
      throw new NotFoundException();
    }

    if (product.owner.id !== userId) {
      throw new ForbiddenException();
    }

    const result = await this.productsRepository.delete({ id });

    return result.affected > 0;
  }
}
