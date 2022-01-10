import { container } from 'tsyringe';
import { MailProvider } from './MailProvider';
import { EtherealMailProvider } from './implementations/EtherealMailProvider';
import { GmailMailProvider } from './implementations/GmailMailProvider';

const emailProviders = {
  ethereal: EtherealMailProvider,
  gmail: GmailMailProvider,
};
container.registerSingleton<MailProvider>(
  'MailProvider',
  emailProviders[process.env.MAIL_PROVIDER]
);
