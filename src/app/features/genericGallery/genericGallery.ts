import { NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { GalleryComponent, GalleryItem, GalleryItemEvent } from '@daelmaak/ngx-gallery';

@Component({
  selector: 'app-generic-gallery',
  imports: [GalleryComponent, NgIf],
  templateUrl: './genericGallery.html',
  styleUrls: ['./genericGallery.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericGallery implements AfterViewInit, OnDestroy {
  @ViewChild(GalleryComponent) gallery?: GalleryComponent;
  @Input() items: GalleryItem[] = [];
  @Input() titulo: string = '';
  private galleryAutoplayTimer?: ReturnType<typeof setInterval>;
  private readonly galleryAutoplayDelay = 4000;



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