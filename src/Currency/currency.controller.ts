import { Controller, Get, Param } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { Currency } from '../interfaces';
import { CurrencyDTO } from '../dto/GetCurrency.dto';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('convertion/:currency/:value')
  getCurrency(@Param() params: CurrencyDTO): Promise<Currency[]> {
    return this.currencyService.getCurrencies(
      params.currency.toString(),
      Number(params.value),
    );
  }
}
