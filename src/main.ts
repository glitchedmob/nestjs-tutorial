import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { ConfigService } from './config/config.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const config: ConfigService = app.get(ConfigService);
  await app.listen(config.port, config.host);

  if (config.env === 'development') {
    // noinspection TsLint
    console.log(`App running at http://${config.host}:${config.port}/`);
  }
}

bootstrap();
