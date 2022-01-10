import { Transporter } from 'nodemailer';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import { MailProvider, SendMail } from '../MailProvider';
export class GmailMailProvider implements MailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'diogojorge1401@gmail.com',
        pass: 'Alba1401',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendMail({ path, subject, to, variables }: SendMail): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: 'Rentx <diogojorge1401@gmail.com>',
      subject,
      html: templateHTML,
    });
  }
}
