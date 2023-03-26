import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Currency } from 'src/interfaces';
import AwesomeApi from './APIs/AwesomeApi/AwesomeApi';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrencyEntity } from './currency.entity';
import { CacheRedisService } from 'src/CacheTool/Redis/cacheRedis.service';
import validateCurrency from 'src/utils/validateCurrency';
import { env } from 'process';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(CurrencyEntity)
    private currencyRepository: Repository<CurrencyEntity>,
    @Inject(CacheRedisService) private cacheService: CacheRedisService,
  ) {}

  validateCurrency(currency: string) {
    const currencyExists = validateCurrency(currency);
    if (!currencyExists) throw new HttpException('Moeda não encontrada', 404);
  }

  convert(currencies: Currency[], currencyBaseValue: number): Currency[] {
    return currencies.map((item) => ({
      currency: item.currency,
      value: Number(item.value) * currencyBaseValue,
    }));
  }

  async getCurrencies(currency: string, value: number): Promise<Currency[]> {
    this.validateCurrency(currency);
    const currencyFromCache = await this.getcurrenciesFromCache(currency);

    const currenciesData: Currency[] = currencyFromCache
      ? JSON.parse(currencyFromCache)
      : await (async () => {
          const api: AwesomeApi = new AwesomeApi();
          api.currencyBase = currency;
          api.currenciesSearch = (await this.getParam(
            'moedasDisponiveis',
          )) as string[];

          const currencies: Currency[] = await api.getCurrencies();

          this.cacheService.set(
            `currency-${api.currencyBase}`,
            JSON.stringify(currencies),
            Number(env.REDIS_TTL),
          );
          return currencies;
        })();

    return this.convert(currenciesData, value);
  }

  async getcurrenciesFromCache(currency: string): Promise<string> {
    return await this.cacheService.get(`currency-${currency}`);
  }

  async getParam(param: string): Promise<string | string[]> {
    const result = await this.currencyRepository.findOne({
      where: { nome: param },
    });

    return result && result.valor;
  }
}
