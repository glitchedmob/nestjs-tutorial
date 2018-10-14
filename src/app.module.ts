import { Module } from '@nestjs/common';

import { CatsModule } from './modules/cats/cats.module';
import { ConfigModule } from './config/config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CatsModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
