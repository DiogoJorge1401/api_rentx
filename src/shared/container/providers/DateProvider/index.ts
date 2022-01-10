import { container } from 'tsyringe';
import { DateProvider } from './DateProvider';
import { DayjsDateProvider } from './implementations/DayjsDateProvider';

export * from './DateProvider'
export * from './implementations/DayjsDateProvider'

container.registerSingleton<DateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider
);
