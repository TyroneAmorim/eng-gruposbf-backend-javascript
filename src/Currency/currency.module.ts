import { Module } from '@nestjs/common';
import { CurrencyController } from './currency.controller';
import { CurrencyEntity } from './currency.entity';
import { CurrencyService } from './currency.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheRedisModule } from 'src/CacheTool/Redis/cacheRedis.module';

@Module({
  imports: [TypeOrmModule.forFeature([CurrencyEntity]), CacheRedisModule],
  controllers: [CurrencyController],
  providers: [CurrencyService],
  exports: [TypeOrmModule],
})
export class CurrencyModule {}
