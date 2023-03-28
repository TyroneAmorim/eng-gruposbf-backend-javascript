import { Controller, Get, Param } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { Currency } from '../interfaces';
import { CurrencyDTO } from '../dto/GetCurrency.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
@ApiTags('Consulta e conversão')
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('convertion/:currency/:value')
  @ApiParam({
    name: 'currency',
    required: true,
    description: 'Moeda de destino para conversao',
    type: 'string',
    schema: {
      default: 'BRL',
    },
  })
  @ApiParam({
    name: 'value',
    required: true,
    description: 'Valor para conversao',
    type: 'number',
    schema: {
      default: '529',
    },
  })
  getCurrency(@Param() params: CurrencyDTO): Promise<Currency[]> {
    return this.currencyService.getCurrencies(
      params.currency.toString(),
      Number(params.value),
    );
  }
}
