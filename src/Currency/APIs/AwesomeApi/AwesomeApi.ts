import axios from 'axios';
import { Conversion } from 'src/interfaces';

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

      const result = data.map((item) => ({
        currency: item.code,
        value: item.ask,
      }));

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
