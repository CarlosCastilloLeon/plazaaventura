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
      image: '/images/blog/blog-1.jpg',
      tag: 'Hair Cut',
      date: '01-Jan-2045',
      title: 'Lorem ipsum dolor',
      excerpt: 'Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor',
      link: ''
    },
    {
      id:'2',
      image: '/images/blog/blog-2.jpg',
      tag: 'Beard Style',
      date: '01-Jan-2045',
      title: 'Lorem ipsum dolor',
      excerpt: 'Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor',
      link: ''
    },
    {
      id:'3',
      image: '/images/blog/blog-3.jpg',
      tag: 'Color & Wash',
      date: '01-Jan-2045',
      title: 'Lorem ipsum dolor',
      excerpt: 'Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor',
      link: ''
    },
    {
      id:'4',
      image: '/images/blog/blog-4.jpg',
      tag: 'Hair Cut',
      date: '01-Jan-2045',
      title: 'Lorem ipsum dolor',
      excerpt: 'Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor',
      link: ''
    },
    {
      id:'5',
      image: '/images/blog/blog-5.jpg',
      tag: 'Beard Style',
      date: '01-Jan-2045',
      title: 'Lorem ipsum dolor',
      excerpt: 'Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor',
      link: ''
    },
    {
      id:'6',
      image: '/images/blog/blog-6.jpg',
      tag: 'Color & Wash',
      date: '01-Jan-2045',
      title: 'Lorem ipsum dolor',
      excerpt: 'Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor',
      link: ''
    }
  ]);

  blogCarouselOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    dots: false,
    nav: true,
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
