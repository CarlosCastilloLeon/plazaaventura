import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, PLATFORM_ID, inject } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    void this.initializeTemplate();
  }

  private async initializeTemplate(): Promise<void> {
    setTimeout(async () => {
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

      const heroSlides = jquery('.hero-slides');

      if (heroSlides.length && typeof heroSlides.vegas === 'function') {
        if (heroSlides.hasClass('vegas-container')) {
          heroSlides.vegas('destroy');
        }

        heroSlides.vegas({
          slides: await this.resolveHeroSlides(),
          timer: false,
          animation: 'kenburns',
        });
      }

      jquery('.navbar-collapse a').off('click.barista').on('click.barista', () => {
        jquery('.navbar-collapse').collapse('hide');
      });

      jquery('.smoothscroll').off('click.barista').on('click.barista', function (this: HTMLElement, event: Event) {
        const elementId = jquery(this).attr('href');

        if (!elementId?.startsWith('#')) {
          return;
        }

        const target = jquery(elementId);

        if (!target.length) {
          return;
        }

        event.preventDefault();

        const stickyWrapperHeight = Number(jquery('.sticky-wrapper').outerHeight()) || 0;
        const navbarHeight = Number(jquery('.navbar').outerHeight()) || 0;
        const scrollOffset = Math.max(stickyWrapperHeight, navbarHeight) + 32;
        const offsetTop = target.offset().top - scrollOffset;

        jquery('body, html').animate({ scrollTop: offsetTop }, 300);
      });
    });
  }

  private async resolveHeroSlides(): Promise<Array<{ src: string }>> {
    const preferredSlides = [
      'images/slides/carrusel1.jpg',
      'images/slides/carrusel2.jpg',
      'images/slides/carrusel3.jpg',
    ];

    const availablePreferredSlides = await Promise.all(preferredSlides.map((src) => this.imageExists(src)));

    if (availablePreferredSlides.every(Boolean)) {
      return preferredSlides.map((src) => ({ src }));
    }

    return [
      { src: 'images/slides/sincere-laugh-showing-picture-smartphone-casual-meeting-with-best-friends-restaurant-terrace.jpg' },
      { src: 'images/happy-waitress-giving-coffee-customers-while-serving-them-coffee-shop.jpg' },
      { src: 'images/young-female-barista-wear-face-mask-serving-take-away-hot-coffee-paper-cup-consumer-cafe.jpg' },
    ];
  }

  private imageExists(src: string): Promise<boolean> {
    return new Promise((resolve) => {
      const image = new Image();

      image.onload = () => resolve(true);
      image.onerror = () => resolve(false);
      image.src = src;
    });
  }
}
