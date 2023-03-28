import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { env } from 'process';
import { Conversion, Currency, GetCurrenciesParams } from 'src/interfaces';
import CurrencyData from './awesomeApi.interface';

@Injectable()
export default class AwesomeApi implements Conversion {
  constructor(private readonly httpService: HttpService) {}
  /**
   * Consulta cotacao das moedas solicitadas na API
   * @param {GetCurrenciesParams} param Moeda para conversao e moedas origem
   * @returns {Currency[]} Lista de moedas pesquisadas
   */
  async getCurrencies({
    currencyBase,
    currenciesSearch,
  }: GetCurrenciesParams): Promise<Currency[]> {
    if (!currencyBase || !currenciesSearch || !currenciesSearch.length) {
      throw new InternalServerErrorException(
        'Moedas disponiveis nao preenchidas em tempo de execucao',
      );
    }
    try {
      const currencieList = currenciesSearch
        .filter((item) => item !== currencyBase)
        .map((item) => `${currencyBase}-${item}`)
        .join();

      const resultData = await this.httpService.axiosRef.get(
        `${env.AWESOME_API_URL}/${currencieList}`,
      );

      const data: CurrencyData[] = Object.values(resultData.data);
      const result: Currency[] = data.map((item: CurrencyData) => ({
        currency: item.codein,
        value: Number(item.ask).toFixed(2),
      }));

      return result;
    } catch (error) {
      const { message, status } = error.response;
      throw new HttpException(message, status);
    }
  }
}
