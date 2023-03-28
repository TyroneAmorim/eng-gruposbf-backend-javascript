import { currencies } from '../common/currencies';

/**
 * Valida string de código de moeda
 * @param {string} currency
 * @returns {boolean} True ou false
 */
export default function validateCurrency(currency: string): boolean {
  return currencies.includes(currency);
}
