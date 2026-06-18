import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
interface BlogPost {
  id:string;
  image: string;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  link: string;
}
@Component({
  standalone: true,
  selector: 'app-carrusel-z',
  imports: [CommonModule, CarouselModule],
  templateUrl: './carruselZ.html',
  styleUrls: ['./carruselZ.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarruselZ { 
   blogPosts = signal<BlogPost[]>([
    {
      id:'1',
      image: '/images/logos-tiendas/ATT vertical-01.jpg',
      tag: 'ATT&T',
      date: 'Lun - Sab 09:00 - 21:00',
      title: 'Distribuidor Autorizado',
      excerpt: 'Descripcion de la tienda ATT&T, Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor',
      link: ''
    },
    {
      id:'2',
      image: '/images/logos-tiendas/Avanti Cocinas.jpg',
      tag: 'Avanti Cocinas',
      date: 'Lun - Sab 09:00 - 21:00',
      title: 'Distribuidor Autorizado',
      excerpt: 'Descripcion de la tienda Avanti Cocinas, Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor',
      link: ''
    },
    {
      id:'3',
      image: '/images/logos-tiendas/DHL_rgb.png',
      tag: 'DHL',
      date: 'Lun - Sab 09:00 - 21:00',
      title: 'Distribuidor Autorizado',
      excerpt: 'Descripcion de la tienda DHL, Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor',
      link: ''
    },
    {
      id:'4',
      image: '/images/logos-tiendas/ecoclean.jpg',
      tag: 'Ecoclean',
      date: 'Lun - Sab 09:00 - 21:00',
      title: 'Distribuidor Autorizado',
      excerpt: 'Descripcion de la tienda Ecoclean, Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor',
      link: ''
    },
    {
      id:'5',
      image: '/images/logos-tiendas/italianlogo.png',
      tag: 'Italian Coffee',
      date: 'Lun - Dom 09:00 - 21:00',
      title: 'Distribuidor Autorizado',
      excerpt: 'Descripcion de la tienda Italian Coffee, Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor',
      link: ''
    },
    {
      id:'6',
      image: '/images/logos-tiendas/Oxxo.jpg',
      tag: 'Oxxo',
      date: 'Lun - Dom 24 horas',
      title: 'Distribuidor Autorizado',
      excerpt: 'Descripcion de la tienda Oxxo, Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor',
      link: ''
    }
  ]);

  blogCarouselOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    dots: false,
    nav: false,
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



}
