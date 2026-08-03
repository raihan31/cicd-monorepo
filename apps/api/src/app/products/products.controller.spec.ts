import { Test, TestingModule } from '@nestjs/testing';
import { ProductsResponse } from '@cicd-monorepo/shared-contracts';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let productsService: jest.Mocked<Pick<ProductsService, 'findAll'>>;

  beforeEach(async () => {
    productsService = {
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: productsService,
        },
      ],
    }).compile();

    controller = module.get(ProductsController);
  });

  it('should return products from the service', () => {
    const response: ProductsResponse = {
      products: [
        {
          id: 10,
          name: 'Monitor',
          price: 400,
        },
      ],
    };

    productsService.findAll.mockReturnValue(response);

    expect(controller.findAll()).toEqual(response);
    expect(productsService.findAll).toHaveBeenCalledTimes(1);
  });
});
