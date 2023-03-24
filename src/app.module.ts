import { Module } from '@nestjs/common';
import { CurrencyController } from './Currency/currency.controller';
import { CurrencyService } from './Currency/currency.service';

@Module({
  imports: [],
  controllers: [CurrencyController],
  providers: [CurrencyService],
})
export class AppModule {}
