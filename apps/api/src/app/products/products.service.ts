import { Injectable } from '@nestjs/common';
import { Product, ProductsResponse } from '@cicd-monorepo/shared-contracts';

@Injectable()
export class ProductsService {
  private readonly products: Product[] = [
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Keyboard', price: 100 },
    { id: 3, name: 'Laptop', price: 200 },
    { id: 4, name: 'Laptop', price: 300 },
    { id: 5, name: 'Laptop', price: 500 },
    { id: 6, name: 'Laptop', price: 500 },
  ];

  findAll(): ProductsResponse {
    return { products: this.products };
  }
}
