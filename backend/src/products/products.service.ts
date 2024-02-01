import {
  ForbiddenException,
  NotFoundException,
  Inject,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { existsSync, rmSync, writeFileSync } from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';
import { Product } from './products.entity';

import {
  IOrderByConditions,
  IProductCreateProps,
  IProductResponse,
  IProductsPaginationResponse,
  IWhereConditions,
} from './products.dto';
import { UsersService } from 'src/users/users.service';
import { TagsService } from 'src/tags/tags.service';
import { join } from 'path';
import { validateFile } from 'src/validators/file';
import { queryOperators } from 'src/constants';

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

  async findAll(
    first: number,
    page: number,
    where: IWhereConditions[] = [],
    orderBy?: IOrderByConditions,
  ): Promise<IProductsPaginationResponse> {
    const query = this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.owner', 'users')
      .leftJoinAndSelect('product.tags', 'tags');

    const whereConditions = where.map((condition) => {
      if (condition.column === 'tag') {
        return {
          ...condition,
          name: 'tags.id',
        };
      }

      return condition;
    });

    whereConditions.forEach((condition, index) => {
      if (index === 0) {
        query.where(
          `${condition.column} ${queryOperators[condition.operator]} :value`,
          { value: condition.value },
        );
      }
    });

    if (orderBy) {
      query.orderBy(orderBy.column, orderBy.order);
    }

    const total = await query.getCount();

    query.skip((page - 1) * first);
    query.take(first);

    const products = await query.getMany();

    return {
      data: products,
      total,
    };
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
    file: Express.Multer.File,
  ): Promise<IProductResponse> {
    const fileValidation = validateFile(file, 1024 * 1000 * 4, [
      'image/png',
      'image/jpg',
      'image/jpeg',
    ]);

    if (!fileValidation.isValid) {
      throw new BadRequestException({
        field: 'image',
        message: fileValidation.message,
      });
    }

    const owner = await this.usersService.findOneById(ownerId);
    const tags = await this.tagsService.find({
      where: {
        id: In(body.tags),
      },
    });

    const filename = `${Date.now()}-${file.originalname}`;

    writeFileSync(
      join(__dirname, '..', '..', 'public/uploads', filename),
      file.buffer,
    );

    const product = this.productsRepository.create({
      ...body,
      image: `uploads/${filename}`,
      tags,
      owner,
    });

    await this.productsRepository.save(product);

    return product;
  }

  async uploadImage(
    id: string,
    ownerId: string,
    file: Express.Multer.File,
  ): Promise<IProductResponse> {
    console.log(file);
    if (!isUUID(id)) {
      throw new NotFoundException();
    }

    const fileValidation = validateFile(file, 1024 * 1000 * 4, [
      'image/png',
      'image/jpg',
      'image/jpeg',
    ]);

    if (!fileValidation.isValid) {
      throw new BadRequestException({
        field: 'image',
        message: fileValidation.message,
      });
    }

    const product = await this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.owner', 'users')
      .where('product.id=:id', { id })
      .getOne();

    if (!product) {
      throw new NotFoundException();
    }

    if (product.owner.id !== ownerId) {
      throw new ForbiddenException();
    }

    const filename = `${Date.now()}-${file.originalname}`;

    const newProduct = this.productsRepository.create({
      id,
      image: `uploads/${filename}`,
    });

    writeFileSync(
      join(__dirname, '..', '..', 'public/uploads', filename),
      file.buffer,
    );

    if (existsSync(join(__dirname, '..', '..', 'public', product.image))) {
      rmSync(join(__dirname, '..', '..', 'public', product.image));
    }

    await this.productsRepository.save(newProduct);

    return newProduct;
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

  async findByUserId(id: string): Promise<IProductResponse[]> {
    return this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.owner', 'users')
      .leftJoinAndSelect('product.tags', 'tags')
      .where('product.owner.id=:id', { id })
      .getMany();
  }

  async findById(id: string): Promise<IProductResponse> {
    return this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.owner', 'users')
      .leftJoinAndSelect('product.tags', 'tags')
      .where('product.id=:id', { id })
      .getOne();
  }
}
