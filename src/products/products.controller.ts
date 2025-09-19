// src/products/products.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus, UseGuards, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products.dto';
import { ProductEntity } from './entities/product.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enums';
import { RolesGuard } from '../auth/decorators/guards/roles.guard';
import { GetUser } from '../auth/decorators/get-user.descorators';
import type { UserPayload } from '../auth/interfaces/user-payload.interface';
import { PaginationResponseDto } from 'src/common/enums/dto/pagination-response.dto'; // Importe o DTO de paginação

@Controller('products')
@UseGuards(AuthGuard('jwt'))
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: UserPayload,
  ): Promise<ProductEntity> {
    return await this.productsService.create(createProductDto, user.userId);
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<PaginationResponseDto<ProductEntity>> { // Usa o DTO como tipo de retorno
    return await this.productsService.findAll({ page, limit });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductEntity> {
    return await this.productsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    return await this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.productsService.remove(id);
  }
}