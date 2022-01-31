import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  private _toLocal(date: string | Date, utc: boolean = false): Date {
    return new Date(moment(date).utc(utc) as any);
  }

  toShortDate(date: string): string {
    const m = moment(this._toLocal(date));
    return m.format('MM/DD/YYYY');
  }
}
