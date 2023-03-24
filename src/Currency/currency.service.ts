import { Injectable } from '@nestjs/common';
import { Currency } from 'src/interfaces';
import AwesomeApi from './APIs/AwesomeApi/AwesomeApi';

@Injectable()
export class CurrencyService {
  async getCurrencys() {
    const api: AwesomeApi = new AwesomeApi();
    api.currencyBase = 'BRL';
    api.currencySearch = ['USD'];
    const currencys: Currency[] = await api.getCurrencys();

    return currencys;
  }
}
