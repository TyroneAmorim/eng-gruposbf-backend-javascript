import { Controller, Get, Headers, Param } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { Currency } from 'src/interfaces';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencieservice: CurrencyService) {}

  @Get('convertion/:currency/:value')
  getCurrency(
    @Param('currency') currency: string,
    @Param('value') value: number,
  ): Promise<Currency[]> {
    return this.currencieservice.getCurrencies(currency, value);
  }
}
