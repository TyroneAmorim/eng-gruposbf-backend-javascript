import { Controller, Get } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { Currency } from '../interfaces';

@Controller()
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('/convertion')
  getCurrency(): Promise<Currency[]> {
    return this.currencyService.getCurrencys();
  }
}
