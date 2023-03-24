export interface Currency {
  currency: string;
  value: number;
}

export interface Conversion {
  currencyBase: string;
  currencySearch: string[];
  getCurrencys(): Promise<Currency[]>;
}
