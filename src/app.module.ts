import { Module } from '@nestjs/common';
import { CurrencyController } from './Currency/currency.controller';
import { CurrencyService } from './Currency/currency.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyEntity } from './Currency/currency.entity';
import { CurrencyModule } from './Currency/currency.module';
import { CacheRedisModule } from './CacheTool/Redis/cacheRedis.module';
import { env } from 'process';
import './envLoad';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: env.MONGO_HOST,
      port: Number(env.MONGO_PORT),
      username: env.MONGO_USER,
      password: env.MONGO_PASSWORD,
      database: env.MONGO_DB,
      entities: [CurrencyEntity],
      synchronize: false,
      useUnifiedTopology: true,
    }),
    CurrencyModule,
    CacheRedisModule,
  ],
  controllers: [CurrencyController],
  providers: [CurrencyService],
})
export class AppModule {}
