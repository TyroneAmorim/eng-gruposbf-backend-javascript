import { CacheModule, Module } from '@nestjs/common';
import { CacheRedisService } from './cacheRedis.service';
import type { RedisClientOptions } from 'redis';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      url: 'redis://default:cachePwd123@localhost:6379/0',
    }),
  ],
  providers: [CacheRedisService],
  exports: [CacheRedisService],
})
export class CacheRedisModule {}
