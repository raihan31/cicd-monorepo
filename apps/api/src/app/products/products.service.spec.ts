import { ProductsService } from './products.service';

describe('ProductsService', () => {
  it('returns products', () => {
    const service = new ProductsService();
    expect(service.findAll().products).toHaveLength(2);
  });
});
