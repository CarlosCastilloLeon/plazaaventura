import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private readonly serviceId = 'service_7otq0pe';
  private readonly templateId = 'template_wtiuqlm';
  private readonly publicKey = 'Jk2KqHDd0WhAmMziy';

  async sendEmail(data: { name: string; email: string; message: string }): Promise<EmailJSResponseStatus> {
    return emailjs.send(this.serviceId, this.templateId, {
      from_name: data.name,
      reply_to: data.email,
      message: data.message,
    }, this.publicKey);
  }
}
