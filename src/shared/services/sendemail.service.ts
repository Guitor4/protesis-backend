/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendGrid/mail';
import 'dotenv';

@Injectable()
export class SendEmailService {
  protected emailSender = 'guilhermetor10@gmail.com'; //email padrão

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    sgMail.setApiKey(process.env.SENDGRID_KEY!);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // this.emailSender = process.env.SENDGRID_EMAIL_SENDER!;
  }

  async sendEmail(to: string, subject: string, text: string, html?: string) {
    await sgMail
      .send({
        to,
        from: this.emailSender,
        subject,
        text,
        html: html ?? undefined,
      })
      .then((result) => {
        console.log(result)
        return result;
      }).catch((emailError) => {
        throw new Error(emailError);
      });
  }

  async sendPasswordResetTokenEmail(to: string) {
    const subject = 'Redefinição de senha'
    const text = `Olá usuário !! Um pedido de redefinição de senha foi iniciado. Aqui está o token para dar continuidade à redefinição de sua senha:  teste123`

    await sgMail
      .send({
        to,
        from: this.emailSender,
        subject,
        text,
      })
      .then((result) => {
        console.log(result)
        return result;
      }).catch((emailError) => {
        throw new Error(emailError);
      });
  }
  
}
