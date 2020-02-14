import * as nodemailer from 'nodemailer';
import * as emailTemplates from 'email-templates';

export class Mailer {
  template: any = null;
  transport: any = null;
  public init(config: any) {
    this.template = new emailTemplates(config.views);
    this.transport = nodemailer.createTransport(config.transport);
  }

  public async send(
    from: string,
    to: string,
    subject: string,
    text: string,
    html?: string
  ) {
    const params: any = {
      from,
      to,
      subject,
      text,
    };

    if (html) {
      params.html = html;
    }
    return await this.transport.sendMail(params);
  }

  public async sendMail(
    from: string,
    to: string,
    subject: string,
    tplName: string,
    locals: any
  ) {
    this.init({ views: 'email-templates', transport: this.transport });
  }
}
