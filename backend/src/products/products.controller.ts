import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  IProductResponse,
  IPaginatorProps,
  IProductCreateProps,
} from './products.dto';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/constants';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  find(@Body() body: IPaginatorProps): Promise<IProductResponse[]> {
    return this.productsService.findAll(body.first, body.page);
  }

  @Get('tag/:id')
  findByTags(
    @Param('id') id: string,
    @Body() body: IPaginatorProps,
  ): Promise<IProductResponse[]> {
    return this.productsService.findByTagId(id, body.first, body.page);
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Company)
  create(
    @Request() req,
    @Body() body: IProductCreateProps,
  ): Promise<IProductResponse> {
    return this.productsService.create(req.user.id, body);
  }

  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Company)
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() body: IProductCreateProps,
  ): Promise<IProductResponse> {
    return this.productsService.update(id, req.user.id, body);
  }
}
