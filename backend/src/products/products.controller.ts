import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBody, ApiOkResponse, ApiConsumes } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import {
  IProductResponse,
  IPaginatorProps,
  IProductCreateProps,
  IProductSearchProps,
  IProductsPaginationResponse,
} from './products.dto';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/constants';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiBody({
    type: IProductSearchProps,
  })
  @ApiOkResponse({ status: 200, type: IProductResponse })
  @Get()
  find(
    @Query() query: IProductSearchProps,
  ): Promise<IProductsPaginationResponse> {
    return this.productsService.findAll(
      query.first,
      query.page,
      query.where,
      query.orderBy,
    );
  }

  @ApiOkResponse({ status: 200, type: IProductResponse })
  @Get('/:id')
  findOne(@Param('id') id: string): Promise<IProductResponse> {
    return this.productsService.findById(id);
  }

  @ApiBody({
    type: IPaginatorProps,
  })
  @ApiOkResponse({ status: 200, type: IProductResponse })
  @Get('tag/:id')
  findByTags(
    @Param('id') id: string,
    @Body() body: IPaginatorProps,
  ): Promise<IProductResponse[]> {
    return this.productsService.findByTagId(id, body.first, body.page);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: IProductCreateProps,
  })
  @ApiOkResponse({ status: 200, type: IProductResponse })
  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Company)
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Request() req,
    @Body() body: IProductCreateProps,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IProductResponse> {
    return this.productsService.create(req.user.id, body, file);
  }

  @ApiConsumes('multipart/form-data')
  @Post('/:id/image')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Company)
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Request() req,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IProductResponse> {
    return this.productsService.uploadImage(id, req.user.id, file);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Company)
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() body: IProductCreateProps,
  ): Promise<IProductResponse> {
    return this.productsService.update(id, req.user.id, body);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Company)
  delete(@Request() req, @Param('id') id: string): Promise<boolean> {
    return this.productsService.delete(id, req.user.id);
  }

  @Get('user/:id')
  findByUser(@Param('id') id: string): Promise<IProductResponse[]> {
    return this.productsService.findByUserId(id);
  }
}
