import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, ViewChild } from '@angular/core';
import { GalleryComponent, GalleryItem } from '@daelmaak/ngx-gallery';

@Component({
  selector: 'app-gallery',
  imports: [GalleryComponent],
  templateUrl: './gallery.html',  
  styleUrls: ['./gallery.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Gallery implements AfterViewInit, OnDestroy {
  @ViewChild(GalleryComponent) gallery?: GalleryComponent;
  private galleryAutoplayTimer?: ReturnType<typeof setInterval>;
  private readonly galleryAutoplayDelay = 4000;

  items: GalleryItem[] = [
    {
      src: 'images/gallery/g1.JPG',
      thumbSrc: 'images/gallery/g1.JPG',
    },
    {
      src: 'images/gallery/g2.JPG',
      thumbSrc: 'images/gallery/g2.JPG',
    },
    {
      src: 'images/gallery/g3.JPG',
      thumbSrc: 'images/gallery/g3.JPG',
    },
    {
      src: 'images/gallery/g4.JPG',
      thumbSrc: 'images/gallery/g4.JPG',
    },
    {
      src: 'images/gallery/g5.JPG',
      thumbSrc: 'images/gallery/g5.JPG',
    },
    {
      src: 'images/gallery/g6.JPG',
      thumbSrc: 'images/gallery/g6.JPG',
    },
    {
      src: 'images/gallery/g7.JPG',
      thumbSrc: 'images/gallery/g7.JPG',
    },
    {
      src: 'images/gallery/g8.JPG',
      thumbSrc: 'images/gallery/g8.JPG',
    },
    {
      src: 'images/gallery/g9.JPG',
      thumbSrc: 'images/gallery/g9.JPG',
    },
    {
      src: 'images/gallery/g10.JPG',
      thumbSrc: 'images/gallery/g10.JPG',
    },
    {
      src: 'images/gallery/g11.JPG',
      thumbSrc: 'images/gallery/g11.JPG',
    },
    {
      src: 'images/gallery/g12.JPG',
      thumbSrc: 'images/gallery/g12.JPG',
    },
    {
      src: 'images/gallery/g13.JPG',
      thumbSrc: 'images/gallery/g13.JPG',
    },


  ];

  ngAfterViewInit(): void {
    this.galleryAutoplayTimer = setInterval(() => {
      this.gallery?.next();
    }, this.galleryAutoplayDelay);
  }

  ngOnDestroy(): void {
    if (this.galleryAutoplayTimer) {
      clearInterval(this.galleryAutoplayTimer);
    }
  }
}
