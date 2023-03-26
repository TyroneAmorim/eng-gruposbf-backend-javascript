import { CacheModule, Module } from '@nestjs/common';
import { CacheRedisService } from './cacheRedis.service';
import type { RedisClientOptions } from 'redis';
import { env } from 'process';

const user = env.REDIS_USER;
const password = env.REDIS_PASSWORD;
const host = env.REDIS_HOST;
const port = env.REDIS_PORT;
const db = env.REDIS_DB;
@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      url: `redis://${user}:${password}@${host}:${port}/${db}`,
    }),
  ],
  providers: [CacheRedisService],
  exports: [CacheRedisService],
})
export class CacheRedisModule {}
