import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { DateProvider } from '../DateProvider';
dayjs.extend(utc);
export class DayjsDateProvider implements DateProvider {
  compareInHours(end_date: Date, start_date: Date): number {
    const end_Date_utc = this.convertToUTC(end_date);
    const start_date_utc = this.convertToUTC(start_date);
    return dayjs(end_Date_utc).diff(start_date_utc, 'hours');
  }
  compareInDays(end_date: Date, start_date: Date): number {
    const end_Date_utc = this.convertToUTC(end_date);
    const start_date_utc = this.convertToUTC(start_date);
    return dayjs(end_Date_utc).diff(start_date_utc, 'days');
  }
  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }
  dateNow(): Date {
    return dayjs().toDate();
  }
  addDays(days: number): Date {
    return dayjs().add(days, 'day').toDate();
  }
  addHours(hours: number): Date {
    return dayjs().add(hours, 'hour').toDate();
  }
  breforeIfAfter(end_date: Date, start_date: Date): boolean {
    return dayjs(end_date).isAfter(start_date);
  }
}
