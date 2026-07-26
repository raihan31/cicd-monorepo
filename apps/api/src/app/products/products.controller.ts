import { Controller, Get } from '@nestjs/common';
import { ProductsResponse } from '@cicd-monorepo/shared-contracts';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): ProductsResponse {
    return this.productsService.findAll();
  }
}
