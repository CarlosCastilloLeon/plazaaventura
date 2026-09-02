import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefono',
  standalone: true
})
export class TelefonoPipe implements PipeTransform {
  transform(value: string | number | null | undefined): string {
    if (!value) return '';

    const strValue = String(value).trim();
    if (!strValue) return '';

    const hasPlus = strValue.startsWith('+');
    const digits = strValue.replace(/\D/g, '');

    if (!digits) return strValue;

    if (digits.length === 10) {
      const area = digits.slice(0, 3);
      const prefix = digits.slice(3, 6);
      const line = digits.slice(6);
      return `(${area}) ${prefix}-${line}`;
    }

    if (digits.length === 12 && digits.startsWith('52')) {
      const countryCode = '+52';
      const area = digits.slice(2, 5);
      const prefix = digits.slice(5, 8);
      const line = digits.slice(8);
      return `${countryCode} (${area}) ${prefix}-${line}`;
    }

    if (digits.length === 11 && digits.startsWith('1')) {
      const countryCode = '+1';
      const area = digits.slice(1, 4);
      const prefix = digits.slice(4, 7);
      const line = digits.slice(7);
      return `${countryCode} (${area}) ${prefix}-${line}`;
    }

    if (hasPlus && digits.length > 10) {
      const countryDigits = digits.length - 10;
      const cc = digits.slice(0, countryDigits);
      const area = digits.slice(countryDigits, countryDigits + 3);
      const prefix = digits.slice(countryDigits + 3, countryDigits + 6);
      const line = digits.slice(countryDigits + 6);
      return `+${cc} (${area}) ${prefix}-${line}`;
    }

    return strValue;
  }
}
