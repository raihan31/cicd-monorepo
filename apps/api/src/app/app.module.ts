import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { HealthModule } from './health/health.module';

@Module({ imports: [ProductsModule, HealthModule] })
export class AppModule {}
