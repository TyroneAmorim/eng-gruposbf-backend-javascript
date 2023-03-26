import { HttpException } from '@nestjs/common';
import axios from 'axios';
import { env } from 'process';
import { Conversion, Currency } from 'src/interfaces';
import CurrencyData from './awesomeApi.interface';

export default class AwesomeApi implements Conversion {
  urlApi: string;
  currencyBase: string;
  currenciesSearch: string[];

  constructor() {
    this.urlApi = env.AWESOME_API_URL;
  }

  async getCurrencies() {
    try {
      const currenciesSearch = this.currenciesSearch
        .filter((item) => item !== this.currencyBase)
        .map((item) => `${this.currencyBase}-${item}`)
        .join();

      const resultData = await axios.get(`${this.urlApi}/${currenciesSearch}`);

      const data: CurrencyData[] = Object.values(resultData.data);
      const result: Currency[] = data.map((item: CurrencyData) => ({
        currency: item.codein,
        value: Number(item.ask).toFixed(2),
      }));

      return result;
    } catch (error) {
      const { message, status } = error.response.data;
      throw new HttpException(message, status);
    }
  }
}
