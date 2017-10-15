import { Injectable } from '@angular/core';

@Injectable()
export class DatetimeService {

  constructor() { }
  formateDateTime(format: string) {
    const year = this.getYear();
    const month = this.getMonth();
    const day = this.getDay();
    const hour = this.getHour();
    const min = this.getMinute();
    switch (format) {
      case 'full':
        return `${year}-${month}-${day} ${hour}:${min}`;
      case 'year':
        return `${year}`;
      case 'month':
        return `${year}-${month}`;
      case 'day':
        return `${year}-${month}-${day}`;
    }
  }
  getYear() {
    const date = new Date();
    const year = date.getFullYear();
    return year;
  }
  getMonth() {
    const date = new Date();
    const month = date.getMonth() + 1;
    let Month = '';
    month < 10 ? Month = '0' + month.toString() : Month = month.toString();
    return Month;
  }
  getDay() {
    const date = new Date();
    const day = date.getDate();
    let Day = '';
    day < 10 ? Day = '0' + day.toString() : Day = day.toString();
    return Day;
  }
  getHour() {
    const date = new Date();
    const hour = date.getHours();
    let Hour = '';
    hour < 10 ? Hour = '0' + hour.toString() : Hour = hour.toString();
    return Hour;
  }
  getMinute() {
    const date = new Date();
    const min = date.getMinutes();
    let Min = '';
    min < 10 ? Min = '0' + min.toString() : Min = min.toString();
    return Min;
  }
}
