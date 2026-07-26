import { Injectable } from '@nestjs/common';
import { Product, ProductsResponse } from '@cicd-monorepo/shared-contracts';

@Injectable()
export class ProductsService {
  private readonly products: Product[] = [
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Keyboard', price: 100 },
  ];

  findAll(): ProductsResponse {
    return { products: this.products };
  }
}
