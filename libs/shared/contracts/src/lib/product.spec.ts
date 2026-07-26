import { Product } from './product';

describe('Product contract', () => {
  it('supports a valid product shape', () => {
    const product: Product = { id: 1, name: 'Laptop', price: 1200 };
    expect(product.name).toBe('Laptop');
  });
});
