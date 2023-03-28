export interface Currency {
  currency: string;
  value: string | number;
}
export interface GetCurrenciesParams {
  currencyBase: string;
  currenciesSearch: string[];
}
export interface Conversion {
  getCurrencies(params: GetCurrenciesParams): Promise<Currency[]>;
}
