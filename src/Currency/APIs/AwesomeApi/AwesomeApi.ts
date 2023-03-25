import { HttpException } from '@nestjs/common';
import axios from 'axios';
import { Conversion } from 'src/interfaces';
import CurrencyData from './awesomeApi.interface';

export default class AwesomeApi implements Conversion {
  urlApi: string;
  currencyBase: string;
  currencySearch: string[];

  constructor() {
    this.urlApi = 'https://economia.awesomeapi.com.br/json/last';
  }

  async getCurrencys() {
    try {
      const currencySearch = this.currencySearch
        .filter((item) => item !== this.currencyBase)
        .map((item) => `${item}-${this.currencyBase}`)
        .join();

      const resultData = await axios.get(`${this.urlApi}/${currencySearch}`);
      const data = resultData.data.length
        ? resultData.data
        : [{ ...resultData.data[Object.keys(resultData.data)[0]] }];

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
