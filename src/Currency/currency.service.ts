import { Injectable } from '@nestjs/common';
import { Currency } from 'src/interfaces';
import CurrencyByLocation from 'src/utils/CurrencyByLocation';
import AwesomeApi from './APIs/AwesomeApi/AwesomeApi';

@Injectable()
export class CurrencyService {
  getCurrency(language: string) {
    const [lang] = language.split(',');
    const currency = CurrencyByLocation.prototype.getCurrency(lang) || 'BRL';
    return currency;
  }

  async getCurrencys(language: string) {
    const api: AwesomeApi = new AwesomeApi();
    api.currencyBase = this.getCurrency(language);
    api.currencySearch = ['USD'];
    const currencys: Currency[] = await api.getCurrencys();

    return currencys;
  }
}
