import {formatDate} from '@angular/common';
import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  formattedDate: string = '';
  transform(value: Timestamp | Date, format?: string): string {
    if (value instanceof Timestamp) {
      const date = value.toDate();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');

      this.formattedDate = `${year}-${month}-${day}`;
      return this.formattedDate;
    } else if (value instanceof Date) {
      return this.formattedDate
    } else {
      return '';
    }
  }
}
