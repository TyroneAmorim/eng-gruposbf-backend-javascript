import { Module } from '@nestjs/common';
import { CurrencyController } from './Currency/currency.controller';
import { CurrencyService } from './Currency/currency.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyEntity } from './Currency/currency.entity';
import { CurrencyModule } from './Currency/currency.module';
import { CacheRedisModule } from './CacheTool/Redis/cacheRedis.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      username: 'usuario',
      password: 'usuario',
      database: 'parametros',
      entities: [CurrencyEntity],
      useUnifiedTopology: true,
    }),
    CurrencyModule,
    CacheRedisModule,
  ],
  controllers: [CurrencyController],
  providers: [CurrencyService],
})
export class AppModule {}
