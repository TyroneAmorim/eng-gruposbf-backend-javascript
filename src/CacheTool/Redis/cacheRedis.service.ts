import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CacheTool } from 'src/interfaces';

@Injectable()
export class CacheRedisService implements CacheTool {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get(key: string): Promise<string> {
    return await this.cacheManager.get(key);
  }

  async set(key: string, value: string, tll?: number): Promise<void> {
    await this.cacheManager.set(key, value, tll);
  }
}
