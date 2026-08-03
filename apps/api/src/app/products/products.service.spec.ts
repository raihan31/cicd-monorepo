import { ProductsService } from './products.service';

describe('ProductsService', () => {
  it('returns products', () => {
    const service = new ProductsService();
    expect(service.findAll().products).toHaveLength(9999);

    expect(service.findAll().products).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: 1, name: 'Laptop', price: 1200 })]),
    );
  });
});
