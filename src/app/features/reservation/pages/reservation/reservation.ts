import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, PLATFORM_ID, inject } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.html',
  styleUrl: './reservation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);

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
}
