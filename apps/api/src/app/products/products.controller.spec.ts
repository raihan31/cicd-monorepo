import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  it('returns service products', () => {
    const controller = new ProductsController(new ProductsService());
    expect(controller.findAll().products[0].name).toBe('Laptop');
  });
});
