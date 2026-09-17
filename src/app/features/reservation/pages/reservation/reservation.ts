import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, PLATFORM_ID, inject } from '@angular/core';
import { NgForm } from '@angular/forms';

import { SitePublicFooterComponent } from '../../../../core/layout/site-public-footer/site-public-footer';
import { SitePublicHeaderComponent } from '../../../../core/layout/site-public-header/site-public-header';
import { FormsModule } from '@angular/forms';
import { EmailService } from '../../../../shared/services/email.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservation',
  imports: [SitePublicHeaderComponent, SitePublicFooterComponent, FormsModule,CommonModule,RouterLink],
  templateUrl: './reservation.html',
  styleUrl: './reservation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  contact = {
    name: '',
    email: '',
    message: '',
  };
  sending = false;
  statusMessage?: string;
  statusClass?: 'success' | 'error';
  private readonly emailService = inject(EmailService);
  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    setTimeout(() => {
      const jquery = (window as typeof window & { jQuery?: any }).jQuery;

      if (!jquery) {
        return;
      }

      const navbar = jquery('.navbar');

      if (navbar.length && typeof navbar.sticky === 'function') {
        if (navbar.parent().hasClass('sticky-wrapper')) {
          navbar.unwrap();
          navbar.removeAttr('style');
        }

        navbar.sticky({ topSpacing: 0 });
      }

      jquery('.navbar-collapse a').off('click.barista').on('click.barista', () => {
        jquery('.navbar-collapse').collapse('hide');
      });
    });
  }

  async sendMessage(form: NgForm): Promise<void> {
    if (!form.valid) {
      this.statusMessage = 'Completa todos los campos obligatorios.';
      this.statusClass = 'error';
      return;
    }

    this.sending = true;
    this.statusMessage = undefined;

    try {
      await this.emailService.sendEmail(this.contact);
      this.statusClass = 'success';
      this.statusMessage = 'Mensaje enviado correctamente. Gracias por contactarnos.';
      form.resetForm();
    } catch (error) {
      console.error('EmailJS send error', error);
      this.statusClass = 'error';
      this.statusMessage = 'No fue posible enviar el mensaje. Intenta de nuevo más tarde.';
    } finally {
      this.sending = false;
    }
  }

}
