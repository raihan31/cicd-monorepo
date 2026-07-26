import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
  Logger.log(`API running at http://localhost:${port}/${globalPrefix}`);
}

bootstrap().catch((error: unknown) => {
  Logger.error('Failed to start API', error);
  process.exit(1);
});
