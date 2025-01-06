import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {

  parseFloat = parseFloat;
  constructor() { }

  /**
   * Formats a string into money form
   * @param value The value
   * @param c Number of decimal places
   * @param d Decimal separator
   * @param t Comma separator
   */
  formatMoney(value: string | number, c: number, d: string = '.', t: string = ',') {
    let n: any = value === '' ? 0 : value;
    c = isNaN(c = Math.abs(c)) ? 2 : c;
    d = d === undefined ? '.' : d;
    t = t === undefined ? ',' : t;
    const s = n < 0 ? '-' : '';
    // tslint:disable-next-line: radix
    const i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)));
    let j = 0;
    // tslint:disable-next-line: no-conditional-assignment
    j = (j = i.length) > 3 ? j % 3 : 0;
    // tslint:disable-next-line: max-line-length
    return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - Number(i)).toFixed(c).slice(2) : '');
  }

  formatNumberCalculate(value: any) {
    if (!value) {
      return 0;
    }
    return this.parseFloat(String(value).replace(/,/g, ''));
  }
}
