import { NgOptimizedImage } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-carrusel-negocios',
  imports: [NgOptimizedImage],
  templateUrl: './carrusel-negocios.html',
  styleUrl: './carrusel-negocios.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarruselNegocios implements AfterViewInit {
  @ViewChild('storeViewport')
  private readonly storeViewport?: ElementRef<HTMLElement>;
  private readonly storeCarouselAutoplayDelay = 3200;
  private storeCarouselIntervalId?: number;
  protected readonly storeLogos = [
    {
      src: '/images/logos-tiendas/ATT%20vertical-01.jpg',
      alt: 'ATT',
    },
    {
      src: '/images/logos-tiendas/DHL_rgb.png',
      alt: 'DHL',
    },
    {
      src: '/images/logos-tiendas/Avanti%20Cocinas.jpg',
      alt: 'Avanti Cocinas',
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

  //Carrusel de negocios

  ngAfterViewInit(): void {
    // this.startStoreCarouselAutoplay();
  }

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
