import { MailProvider, SendMail } from '../../MailProvider/MailProvider';

export class MailProviderInMemory implements MailProvider {
  private messages: SendMail[] = [];
  async sendMail(data: SendMail): Promise<void> {
    this.messages.push(data);
  }
}
