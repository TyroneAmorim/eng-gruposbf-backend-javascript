export interface Currency {
  currency: string;
  value: string | number;
}

export interface Conversion {
  currencyBase: string;
  currenciesSearch: string[];
  getCurrencies(): Promise<Currency[]>;
}
