import { NgOptimizedImage } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class GalleryComponent {
  private readonly destroyRef = inject(DestroyRef);
  private touchStartY = 0;
  private touchStartX = 0;
  private touchEndY = 0;
  private touchEndX = 0;

  protected readonly galleryImages = signal<string[]>([]);
  protected readonly isLoading = signal(true);
  protected readonly isLightboxOpen = signal(false);
  protected readonly activeImageIndex = signal(0);
  protected readonly activeImageSrc = computed(() => this.galleryImages()[this.activeImageIndex()] ?? '');
  protected readonly activeImageLabel = computed(() => {
    const total = this.galleryImages().length;
    if (total === 0) {
      return '0 / 0';
    }

    return `${this.activeImageIndex() + 1} / ${total}`;
  });

  constructor() {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!this.isLightboxOpen()) {
        return;
      }

      if (event.key === 'Escape') {
        this.closeLightbox();
      }

      if (event.key === 'ArrowRight') {
        this.nextImage();
      }

      if (event.key === 'ArrowLeft') {
        this.previousImage();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    this.destroyRef.onDestroy(() => {
      window.removeEventListener('keydown', onKeyDown);
    });

    void this.loadGalleryImages();
  }

  protected openLightbox(index: number): void {
    this.activeImageIndex.set(index);
    this.isLightboxOpen.set(true);
  }

  protected closeLightbox(): void {
    this.isLightboxOpen.set(false);
  }

  protected nextImage(): void {
    const total = this.galleryImages().length;
    if (total === 0) {
      return;
    }

    this.activeImageIndex.update((current) => (current + 1) % total);
  }

  protected previousImage(): void {
    const total = this.galleryImages().length;
    if (total === 0) {
      return;
    }

    this.activeImageIndex.update((current) => (current - 1 + total) % total);
  }

  protected onLightboxTouchStart(event: TouchEvent): void {
    const touch = event.changedTouches[0];

    if (!touch) {
      return;
    }

    this.touchStartY = touch.clientY;
    this.touchStartX = touch.clientX;
  }

  protected onLightboxTouchMove(event: TouchEvent): void {
    const touch = event.changedTouches[0];

    if (!touch) {
      return;
    }

    this.touchEndY = touch.clientY;
    this.touchEndX = touch.clientX;
  }

  protected onLightboxTouchEnd(): void {
    const deltaY = this.touchEndY - this.touchStartY;
    const deltaX = this.touchEndX - this.touchStartX;
    const isMostlyVertical = Math.abs(deltaY) > Math.abs(deltaX) * 1.15;

    if (deltaY > 90 && isMostlyVertical) {
      this.closeLightbox();
    }

    this.touchStartY = 0;
    this.touchStartX = 0;
    this.touchEndY = 0;
    this.touchEndX = 0;
  }

  private async loadGalleryImages(): Promise<void> {
    const images: string[] = [];
    let consecutiveMisses = 0;

    for (let i = 1; i <= 200 && consecutiveMisses < 2; i++) {
      const imageSrc = `/img/galeria/galeria_${i}.jpg`;
      const exists = await this.imageExists(imageSrc);

      if (exists) {
        images.push(imageSrc);
        consecutiveMisses = 0;
      } else {
        consecutiveMisses++;
      }
    }

    this.galleryImages.set(images);
    this.isLoading.set(false);
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
