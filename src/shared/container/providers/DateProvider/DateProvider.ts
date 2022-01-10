export interface DateProvider {
  compareInHours(end_date: Date, start_date: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  compareInDays(end_date: Date, start_date: Date): number;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  breforeIfAfter(end_date: Date, start_date: Date):boolean;
}
