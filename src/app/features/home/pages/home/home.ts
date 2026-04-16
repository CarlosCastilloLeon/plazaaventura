import { NgOptimizedImage } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);
  private readonly numberFormatter = new Intl.NumberFormat('es-MX');
  private readonly storeCarouselAutoplayDelay = 3200;
  private indicatorObserver?: IntersectionObserver;
  private storeCarouselIntervalId?: number;

  @ViewChild('indicatorsSection')
  private readonly indicatorsSection?: ElementRef<HTMLElement>;

  @ViewChild('storeViewport')
  private readonly storeViewport?: ElementRef<HTMLElement>;

  protected readonly slides = [
    {
      src: '/img/hero-slider/carrusel1.JPG',
      alt: 'Vista principal de Plaza Aventura',
    },
    {
      src: '/img/hero-slider/carrusel2.JPG',
      alt: 'Locales comerciales en Plaza Aventura',
    },
    {
      src: '/img/hero-slider/carrusel3.jpg',
      alt: 'Espacios y experiencia del centro comercial Plaza Aventura',
    },
  ];

  protected readonly activeSlideIndex = signal(0);
  protected readonly activeSlide = computed(() => this.slides[this.activeSlideIndex()]);

  protected readonly storeLogos = [
    {
      src: '/img/logos-tiendas/ATT%20vertical-01.jpg',
      alt: 'ATT',
    },
    {
      src: '/img/logos-tiendas/Avanti%20Cocinas.jpg',
      alt: 'Avanti Cocinas',
    },
    {
      src: '/img/logos-tiendas/DHL_rgb.png',
      alt: 'DHL',
    },
    {
      src: '/img/logos-tiendas/ecoclean.jpg',
      alt: 'Ecoclean',
    },
    {
      src: '/img/logos-tiendas/italianlogo.png',
      alt: 'Italian',
    },
    {
      src: '/img/logos-tiendas/logo.PNG',
      alt: 'Marca de tienda',
    },
    {
      src: '/img/logos-tiendas/Oxxo.jpg',
      alt: 'OXXO',
    },
  ];

  protected readonly directoryPreview = [
    {
      logo: '/img/logos-tiendas/Oxxo.jpg',
      name: 'OXXO',
      schedule: 'Lun-Vie 9:00am a 06:00pm',
      local: 'Local 1',
    },
    {
      logo: '/img/logos-tiendas/DHL_rgb.png',
      name: 'DHL',
      schedule: 'Lun-Vie 9:00am a 06:00pm',
      local: 'Local 4',
    },
    {
      logo: '/img/logos-tiendas/ecoclean.jpg',
      name: 'Ecoclean',
      schedule: 'Lun-Vie 9:00am a 06:00pm',
      local: 'Local 7',
    },
    {
      logo: '/img/logos-tiendas/Avanti%20Cocinas.jpg',
      name: 'Avanti Cocinas',
      schedule: 'Lun-Vie 9:00am a 06:00pm',
      local: 'Local 10',
    },
  ];

  protected readonly basicServices = [
    {
      title: 'Ubicación',
      iconClass: 'fa-solid fa-location-dot',
      description: 'Conectados con zonas clave de la ciudad para que tus clientes lleguen con facilidad.',
    },
    {
      title: 'Vigilancia 24 horas',
      iconClass: 'fa-solid fa-shield-halved',
      description: 'Seguridad activa todo el día para brindar tranquilidad a visitantes y comercios.',
    },
    {
      title: 'Facilidad de Acceso',
      iconClass: 'fa-solid fa-road',
      description: 'Ingresos y salidas ágiles para una experiencia cómoda desde tu llegada.',
    },
    {
      title: 'Estacionamiento Gratuito',
      iconClass: 'fa-solid fa-square-parking',
      description: 'Espacios disponibles sin costo para mejorar la comodidad de tus clientes.',
    },
  ];

  protected readonly indicators = [
    {
      title: 'Clientes Felices',
      target: 12500,
      prefix: '+',
      suffix: '',
      iconClass: 'fa-solid fa-face-smile-beam',
    },
    {
      title: 'Servicios',
      target: 35,
      prefix: '',
      suffix: '+',
      iconClass: 'fa-solid fa-concierge-bell',
    },
    {
      title: 'Lugares Estacionamiento',
      target: 280,
      prefix: '',
      suffix: '',
      iconClass: 'fa-solid fa-square-parking',
    },
    {
      title: 'Visitas Diarias',
      target: 4800,
      prefix: '+',
      suffix: '',
      iconClass: 'fa-solid fa-user-group',
    },
  ];

  protected readonly galleryPreview = [
    '/img/galeria/galeria_1.jpg',
    '/img/galeria/galeria_2.jpg',
    '/img/galeria/galeria_3.jpg',
  ];

  protected readonly testimonials = [
    {
      quote:
        'Excelente ubicación y gran flujo de personas. Nuestro negocio creció desde el primer mes en Plaza Aventura.',
      author: 'Andrea M.',
      role: 'Arrendataria Local 10',
    },
    {
      quote:
        'La plaza es segura, accesible y tiene un ambiente ideal para familias. Siempre encontramos todo en un mismo lugar.',
      author: 'Carlos R.',
      role: 'Cliente frecuente',
    },
    {
      quote:
        'La administración ha sido muy profesional y cercana. Es un espacio comercial con mucho potencial para marcas nuevas.',
      author: 'Mariana V.',
      role: 'Comerciante Local 18',
    },
  ];

  protected readonly indicatorValues = signal<number[]>(this.indicators.map(() => 0));
  protected readonly hasAnimatedIndicators = signal(false);
  protected readonly hasSubmittedContact = signal(false);
  protected readonly activeTestimonialIndex = signal(0);

  protected readonly contactForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]{8,20}$/)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

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

  constructor() {
    const intervalId = setInterval(() => {
      this.nextSlide();
    }, 5500);

    const testimonialIntervalId = setInterval(() => {
      this.nextTestimonial();
    }, 6000);

    this.destroyRef.onDestroy(() => {
      clearInterval(intervalId);
      clearInterval(testimonialIntervalId);
      this.stopStoreCarouselAutoplay();
      this.indicatorObserver?.disconnect();
    });
  }

  ngAfterViewInit(): void {
    const section = this.indicatorsSection?.nativeElement;

    if (!section) {
      return;
    }

    this.indicatorObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry?.isIntersecting) {
          this.startIndicatorsAnimation();
          this.indicatorObserver?.disconnect();
        }
      },
      {
        threshold: 0.35,
      },
    );

    this.indicatorObserver.observe(section);

    this.startStoreCarouselAutoplay();
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

  private stopStoreCarouselAutoplay(): void {
    if (this.storeCarouselIntervalId === undefined) {
      return;
    }

    clearInterval(this.storeCarouselIntervalId);
    this.storeCarouselIntervalId = undefined;
  }

  protected formatIndicatorValue(index: number): string {
    const item = this.indicators[index];

    if (!item) {
      return '0';
    }

    const value = this.indicatorValues()[index] ?? 0;
    return `${item.prefix}${this.numberFormatter.format(value)}${item.suffix}`;
  }

  private startIndicatorsAnimation(): void {
    if (this.hasAnimatedIndicators()) {
      return;
    }

    this.hasAnimatedIndicators.set(true);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      this.indicatorValues.set(this.indicators.map((item) => item.target));
      return;
    }

    const duration = 1450;
    const animationStart = performance.now();

    const tick = (currentTime: number) => {
      const progress = Math.min((currentTime - animationStart) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      this.indicatorValues.set(
        this.indicators.map((item) => Math.round(item.target * easedProgress)),
      );

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }

  protected goToSlide(index: number): void {
    this.activeSlideIndex.set(index);
  }

  protected previousSlide(): void {
    this.activeSlideIndex.update((currentIndex) => {
      if (currentIndex === 0) {
        return this.slides.length - 1;
      }

      return currentIndex - 1;
    });
  }

  protected nextSlide(): void {
    this.activeSlideIndex.update((currentIndex) => {
      if (currentIndex === this.slides.length - 1) {
        return 0;
      }

      return currentIndex + 1;
    });
  }

  protected goToTestimonial(index: number): void {
    this.activeTestimonialIndex.set(index);
  }

  protected previousTestimonial(): void {
    this.activeTestimonialIndex.update((currentIndex) => {
      if (currentIndex === 0) {
        return this.testimonials.length - 1;
      }

      return currentIndex - 1;
    });
  }

  protected nextTestimonial(): void {
    this.activeTestimonialIndex.update((currentIndex) => {
      if (currentIndex === this.testimonials.length - 1) {
        return 0;
      }

      return currentIndex + 1;
    });
  }

  protected submitContactForm(): void {
    this.contactForm.markAllAsTouched();

    if (this.contactForm.invalid) {
      return;
    }

    this.hasSubmittedContact.set(true);
    this.contactForm.reset({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  }
}
