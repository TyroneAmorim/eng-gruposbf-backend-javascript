import { CurrencyTool } from 'src/interfaces';
import { getCurrency as getFromLocale } from 'locale-currency';

export default class implements CurrencyTool {
  getCurrency(lang: string): string {
    return getFromLocale(lang);
  }
}
