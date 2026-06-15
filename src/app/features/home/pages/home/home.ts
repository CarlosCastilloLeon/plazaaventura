import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SitePublicFooterComponent } from '../../../../core/layout/site-public-footer/site-public-footer';
import { SitePublicHeaderComponent } from '../../../../core/layout/site-public-header/site-public-header';
import { BUSINESS_DIRECTORY } from '../../../businesses/data/business-directory.data';
import { CarruselNegocios } from "../../../carrusel-negocios/carrusel-negocios";
import { CarruselZ } from '../../../carruselZ/carruselZ';

@Component({
  selector: 'app-home',
  imports: [RouterLink, SitePublicHeaderComponent, SitePublicFooterComponent, NgOptimizedImage, CarruselNegocios, CarruselZ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  @ViewChild('storeViewport')
  private readonly storeViewport?: ElementRef<HTMLElement>;
  readonly serviceBusinesses = BUSINESS_DIRECTORY.filter((business) => business.section === 'services');
  readonly moreOptionBusinesses = BUSINESS_DIRECTORY.filter((business) => business.section === 'more-options');
  private readonly storeCarouselAutoplayDelay = 3200;
  private indicatorObserver?: IntersectionObserver;
  private storeCarouselIntervalId?: number;
  protected readonly storeLogos = [
    {
      src: '/images/logos-tiendas/ATT%20vertical-01.jpg',
      alt: 'ATT',
    },
    {
      src: '/images/logos-tiendas/Avanti%20Cocinas.jpg',
      alt: 'Avanti Cocinas',
    },
    {
      src: '/images/logos-tiendas/DHL_rgb.png',
      alt: 'DHL',
    },
    {
      src: '/images/logos-tiendas/ecoclean.jpg',
      alt: 'Ecoclean',
    },
    {
      src: '/images/logos-tiendas/italianlogo.png',
      alt: 'Italian',
    },
    {
      src: '/images/logos-tiendas/logo.PNG',
      alt: 'Marca de tienda',
    },
    {
      src: '/images/logos-tiendas/Oxxo.jpg',
      alt: 'OXXO',
    },
  ];
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

  //Carrusel de negocios

  protected moveStoreCarousel(viewport: HTMLElement, direction: -1 | 1): void {
    const firstCard = viewport.querySelector('.store-carousel__card');
    const cardWidth = firstCard instanceof HTMLElement ? firstCard.offsetWidth : 208;
    const gap = 16;
    const scrollAmount = (cardWidth + gap) * 2 * direction;

    viewport.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  }

  protected onStoreCarouselInteraction(): void {
    this.stopStoreCarouselAutoplay();
    this.startStoreCarouselAutoplay();
  }
  private stopStoreCarouselAutoplay(): void {
    if (this.storeCarouselIntervalId === undefined) {
      return;
    }

    clearInterval(this.storeCarouselIntervalId);
    this.storeCarouselIntervalId = undefined;
  }

  private startStoreCarouselAutoplay(): void {
    const viewport = this.storeViewport?.nativeElement;

    if (!viewport) {
      return;
    }

    this.stopStoreCarouselAutoplay();

    this.storeCarouselIntervalId = window.setInterval(() => {
      const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth;

      if (maxScrollLeft <= 0) {
        return;
      }

      const isAtEnd = viewport.scrollLeft >= maxScrollLeft - 2;

      if (isAtEnd) {
        viewport.scrollTo({ left: 0, behavior: 'smooth' });
        return;
      }

      this.moveStoreCarousel(viewport, 1);
    }, this.storeCarouselAutoplayDelay);
  }

}
