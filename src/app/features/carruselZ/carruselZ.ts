import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Tienda } from '../../shared/interface/tienda.interface';
import tiendasData from '../../BDlocal/tiendas.json';

@Component({
  standalone: true,
  selector: 'app-carrusel-z',
  imports: [CommonModule, CarouselModule],
  templateUrl: './carruselZ.html',
  styleUrls: ['./carruselZ.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarruselZ {
  private readonly router = inject(Router);
  blogPosts = signal<Tienda[]>(tiendasData as Tienda[]);

  blogCarouselOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    dots: false,
    nav: false,
    touchDrag: false,
    mouseDrag: false,
    navText: [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>'
    ],
    responsive: {
      0: { items: 1 },
      576: { items: 1 },
      768: { items: 2 },
      992: { items: 3 }
    }
  };

  openTienda(slide: Tienda) {
    if (slide.tiendaId != null) {
      this.router.navigate(['/tiendas', slide.tiendaId]);
    }
  }

}
