import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Currency } from '../interfaces';
import AwesomeApi from './APIs/AwesomeApi/AwesomeApi';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrencyEntity } from './currency.entity';
import { CacheRedisService } from '../CacheTool/Redis/cacheRedis.service';
import validateCurrency from '../utils/validateCurrency';
import { env } from 'process';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(CurrencyEntity)
    private currencyRepository: Repository<CurrencyEntity>,
    @Inject(CacheRedisService) private cacheService: CacheRedisService,
    @Inject(AwesomeApi) private apiService: AwesomeApi,
  ) {}

  validateCurrency(currency: string): void {
    const currencyExists = validateCurrency(currency);
    if (!currencyExists) throw new NotFoundException('Moeda não encontrada');
  }

  /**
   * Converte o valor solicitado nas moedas cadastradas em BD
   * @param {Currency[]} currencies Moedas permitidas previamente cadastradas em BD
   * @param {string} currencyBaseValue Valor solicitado para conversao
   * @returns {Currency[]} Currency[]
   */
  convert(currencies: Currency[], currencyBaseValue: number): Currency[] {
    return currencies.map((item) => ({
      currency: item.currency,
      value: Number((Number(item.value) * currencyBaseValue).toFixed(2)),
    }));
  }

  async getCurrencies(currency: string, value: number): Promise<Currency[]> {
    this.validateCurrency(currency);
    const currencyFromCache = await this.getcurrenciesFromCache(currency);

    const currenciesData: Currency[] = currencyFromCache
      ? JSON.parse(currencyFromCache)
      : await (async () => {
          const currenciesSearch = (await this.getParam(
            'moedasDisponiveis',
          )) as string[];

          const currencies: Currency[] = await this.apiService.getCurrencies({
            currencyBase: currency,
            currenciesSearch,
          });

          this.cacheService.set(
            `currency-${currency}`,
            JSON.stringify(currencies),
            Number(env.REDIS_TTL),
          );
          return currencies;
        })();

    return this.convert(currenciesData, value);
  }

  /**
   * Faz a busca dos valores de moedas salvas em cache anteriormente
   * @param {string} currency Codigo de moeda
   * @returns {string} Lista de moedas salvas em cache
   */
  async getcurrenciesFromCache(currency: string): Promise<string> {
    return await this.cacheService.get(`currency-${currency}`);
  }

  /**
   * Busca parametro solicitado no banco de dados
   * @param {string} param
   * @returns {CurrencyEntity} Dados salvos no banco de dados
   */
  async getParam(param: string): Promise<string | string[]> {
    const result = await this.currencyRepository.findOne({
      where: { nome: param },
    });

    return result && result.valor;
  }
}
