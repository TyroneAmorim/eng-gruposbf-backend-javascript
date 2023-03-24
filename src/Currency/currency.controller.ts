import { Controller, Get, Headers } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { Currency } from 'src/interfaces';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('convertion')
  getCurrency(
    @Headers('accept-language') language: string,
  ): Promise<Currency[]> {
    return this.currencyService.getCurrencys(language);
  }
}
