import { HttpException } from '@nestjs/common';
import axios from 'axios';
import { Conversion } from 'src/interfaces';
import CurrencyData from './awesomeApi.interface';

export default class AwesomeApi implements Conversion {
  urlApi: string;
  currencyBase: string;
  currencySearch: string[];

  constructor() {
    this.urlApi = 'https://economia.awesomeapi.com.br/json';
  }

  async getCurrencys() {
    try {
      const currencySearch = this.currencySearch
        .map((item) => `${item}-${this.currencyBase}`)
        .join();

      const { data } = await axios.get(`${this.urlApi}/${currencySearch}`);
      const result = data.map((item: CurrencyData) => ({
        currency: item.code,
        value: item.ask,
      }));
      return result;
    } catch (error) {
      const { message, status } = error.response.data;
      throw new HttpException(message, status);
    }
  }
}
