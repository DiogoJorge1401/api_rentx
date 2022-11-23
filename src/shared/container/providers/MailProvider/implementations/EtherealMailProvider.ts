import { MailProvider, SendMail } from '../MailProvider';
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

export class EtherealMailProvider implements MailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'karlee.carter21@ethereal.email',
        pass: '2NMNyc2qhuukufrsvc',
      },
    });
  }

  async sendMail({ variables, path, subject, to }: SendMail): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');
    const templateParse = handlebars.compile(templateFileContent);
    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: 'Rentx <rentxnoreplay@rentx.com.br>',
      subject,
      html: templateHTML,
    });
  }
}
