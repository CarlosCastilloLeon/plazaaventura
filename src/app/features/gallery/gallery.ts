import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { GalleryComponent, GalleryItem, GalleryItemEvent } from '@daelmaak/ngx-gallery';

@Component({
  selector: 'app-gallery',
  imports: [GalleryComponent, NgIf],
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
      src: 'images/gallery/1.png',
      thumbSrc: 'images/gallery/1.png',
    },
    {
      src: 'images/gallery/2.png',
      thumbSrc: 'images/gallery/2.png',
    },
    {
      src: 'images/gallery/3.png',
      thumbSrc: 'images/gallery/3.png',
    },
    {
      src: 'images/gallery/4.png',
      thumbSrc: 'images/gallery/4.png',
    },
    {
      src: 'images/gallery/5.png',
      thumbSrc: 'images/gallery/5.png',
    },
    {
      src: 'images/gallery/6.png',
      thumbSrc: 'images/gallery/6.png',
    },
    {
      src: 'images/gallery/7.png',
      thumbSrc: 'images/gallery/7.png',
    },
    {
      src: 'images/gallery/8.png',
      thumbSrc: 'images/gallery/8.png',
    },
    {
      src: 'images/gallery/9.png',
      thumbSrc: 'images/gallery/9.png',
    },
    {
      src: 'images/gallery/10.png',
      thumbSrc: 'images/gallery/10.png',
    },
    {
      src: 'images/gallery/11.png',
      thumbSrc: 'images/gallery/11.png',
    },
    {
      src: 'images/gallery/12.png',
      thumbSrc: 'images/gallery/12.png',
    },
    {
      src: 'images/gallery/13.png',
      thumbSrc: 'images/gallery/13.png',
    },
    {
      src: 'images/gallery/14.png',
      thumbSrc: 'images/gallery/14.png',
    },
    {
      src: 'images/gallery/15.png',
      thumbSrc: 'images/gallery/15.png',
    },
    {
      src: 'images/gallery/16.png',
      thumbSrc: 'images/gallery/16.png',
    },
    {
      src: 'images/gallery/17.png',
      thumbSrc: 'images/gallery/17.png',
    },
    {
      src: 'images/gallery/18.png',
      thumbSrc: 'images/gallery/18.png',
    },
    {
      src: 'images/gallery/19.png',
      thumbSrc: 'images/gallery/19.png',
    },
    {
      src: 'images/gallery/20.JPG',
      thumbSrc: 'images/gallery/20.JPG',
    },
    {
      src: 'images/gallery/21.JPG',
      thumbSrc: 'images/gallery/21.JPG',
    },
    {
      src: 'images/gallery/22.JPG',
      thumbSrc: 'images/gallery/22.JPG',
    },


  ];

  selectedIndex = -1;

  get currentImage(): GalleryItem | undefined {
    return this.items[this.selectedIndex];
  }

  openImage(event: GalleryItemEvent): void {
    this.selectedIndex = event.index;
  }

  closeViewer(): void {
    this.selectedIndex = -1;
  }

  prevImage(): void {
    if (this.items.length === 0) {
      return;
    }

    this.selectedIndex = (this.selectedIndex - 1 + this.items.length) % this.items.length;
  }

  nextImage(): void {
    if (this.items.length === 0) {
      return;
    }

    this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
  }

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
