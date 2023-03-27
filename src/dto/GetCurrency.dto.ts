import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsString } from 'class-validator';
import { currencies } from '../common/currencies';

export class CurrencyDTO {
  @IsString({
    message: 'Moeda precisa ser uma string',
  })
  @IsIn(currencies, {
    message: 'Moeda inválida',
  })
  currency: string;

  @Type(() => Number)
  @IsNumber(
    {
      maxDecimalPlaces: 2,
    },
    {
      message: 'Valor inválido',
    },
  )
  value: number;
}
