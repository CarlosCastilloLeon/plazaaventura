import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';

type SiteTheme =
  | 'default'
  | 'lush-digital'
  | 'blue-fresh'
  | 'clean-highlight'
  | 'casual'
  | 'inesperados'
  | 'retro'
  | 'clean'
  | 'colorful'
  | 'fresh'
  | 'intense';

interface ThemeOption {
  value: SiteTheme;
  label: string;
}

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeaderComponent {
  readonly themeOptions: ThemeOption[] = [
    { value: 'default', label: 'Actual (Default)' },
    { value: 'lush-digital', label: 'Lush Digital' },
    { value: 'blue-fresh', label: 'Azules Frescos' },
    { value: 'clean-highlight', label: 'Limpio Resaltado' },
    { value: 'casual', label: 'Casual' },
    { value: 'inesperados', label: 'Inesperados' },
    { value: 'retro', label: 'Retro' },
    { value: 'clean', label: 'Clean' },
    { value: 'colorful', label: 'Colorful' },
    { value: 'fresh', label: 'Fresh' },
    { value: 'intense', label: 'Intense' },
  ];

  readonly darkHeaderThemes = new Set<SiteTheme>(['lush-digital', 'inesperados']);

  readonly selectedTheme = signal<SiteTheme>('default');
  readonly isMobileMenuOpen = signal(false);
  readonly currentLogoPath = computed(() =>
    this.darkHeaderThemes.has(this.selectedTheme())
      ? 'img/logos/logo aventura.png'
      : 'img/logos/logo aventura black.png',
  );

  private readonly document = inject(DOCUMENT);

  constructor() {
    const initialTheme = this.getInitialTheme();
    this.selectedTheme.set(initialTheme);
    this.applyTheme(initialTheme);
  }

  selectTheme(theme: SiteTheme, themeMenu?: HTMLDetailsElement): void {
    this.selectedTheme.set(theme);
    this.applyTheme(theme);
    themeMenu?.removeAttribute('open');

    try {
      localStorage.setItem('site-theme', theme);
    } catch {
      // Ignore localStorage access errors.
    }
  }

  closeThemeMenu(themeMenu: HTMLDetailsElement): void {
    themeMenu.removeAttribute('open');
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((value) => !value);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  trackByTheme(_: number, option: ThemeOption): SiteTheme {
    return option.value;
  }

  private getInitialTheme(): SiteTheme {
    try {
      const storedTheme = localStorage.getItem('site-theme');

      if (storedTheme && this.isTheme(storedTheme)) {
        return storedTheme;
      }
    } catch {
      // Ignore localStorage access errors.
    }

    return 'default';
  }

  private applyTheme(theme: SiteTheme): void {
    this.document.body.setAttribute('data-theme', theme);
  }

  private isTheme(value: string): value is SiteTheme {
    return this.themeOptions.some((theme) => theme.value === value);
  }
}
