import { Injectable } from '@nestjs/common';
import { Currency } from 'src/interfaces';
import CurrencyByLocation from 'src/utils/CurrencyByLocation';
import AwesomeApi from './APIs/AwesomeApi/AwesomeApi';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrencyEntity } from './currency.entity';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(CurrencyEntity)
    private currencyRepository: Repository<CurrencyEntity>,
  ) {}

  async getCurrency(language: string) {
    const [lang] = language.split(',');
    const defaultCurrency = await this.getParam('moedaBase');
    const currency = CurrencyByLocation.prototype.getCurrency(lang);

    return currency || defaultCurrency.toString();
  }

  async getCurrencys(language: string) {
    const api: AwesomeApi = new AwesomeApi();
    api.currencyBase = await this.getCurrency(language);
    api.currencySearch = (await this.getParam('moedasDisponiveis')) as string[];

    const currencys: Currency[] = await api.getCurrencys();
    return currencys;
  }

  async getParam(param: string) {
    const result = await this.currencyRepository.findOne({
      where: { nome: param },
    });

    return result && result.valor;
  }
}
