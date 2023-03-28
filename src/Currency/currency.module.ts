import { Module } from '@nestjs/common';
import { CurrencyController } from './currency.controller';
import { CurrencyEntity } from './currency.entity';
import { CurrencyService } from './currency.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheRedisModule } from '../CacheTool/Redis/cacheRedis.module';
import AwesomeApi from './APIs/AwesomeApi/AwesomeApi';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([CurrencyEntity]),
    CacheRedisModule,
    HttpModule,
  ],
  controllers: [CurrencyController],
  providers: [CurrencyService, AwesomeApi],
  exports: [TypeOrmModule, AwesomeApi],
})
export class CurrencyModule {}
