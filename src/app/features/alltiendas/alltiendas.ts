import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import tiendasData from '../../BDlocal/tiendas.json';
import { SitePublicFooterComponent } from '../../core/layout/site-public-footer/site-public-footer';
import { SitePublicHeaderComponent } from '../../core/layout/site-public-header/site-public-header';
import { Tienda } from '../../shared/interface/tienda.interface';

@Component({
  selector: 'app-alltiendas',
  imports: [RouterLink, SitePublicHeaderComponent, SitePublicFooterComponent],
  templateUrl: './alltiendas.html',
  styleUrl: './alltiendas.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Alltiendas {
  private readonly allStores = tiendasData as Tienda[];
  readonly selectedCategory = signal('Todas');
  readonly searchTerm = signal('');
  readonly currentPage = signal(1);
  readonly storesPerPage = 8;

  readonly categories = computed(() => [
    'Todas',
    ...Array.from(new Set(this.allStores.map((store) => store.categoria).filter((category): category is string => !!category))).sort(),
  ]);

  readonly filteredStores = computed(() => {
    const category = this.selectedCategory();
    const term = this.searchTerm().trim().toLocaleLowerCase();

    return this.allStores.filter((store) => {
      const matchesCategory = category === 'Todas' || store.categoria === category;
      const searchableText = `${store.nombre ?? ''} ${store.categoria ?? ''}`.toLocaleLowerCase();
      return matchesCategory && searchableText.includes(term);
    });
  });

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.filteredStores().length / this.storesPerPage)));
  readonly visibleStores = computed(() => {
    const page = Math.min(this.currentPage(), this.totalPages());
    const start = (page - 1) * this.storesPerPage;
    return this.filteredStores().slice(start, start + this.storesPerPage);
  });

  readonly pageNumbers = computed(() => Array.from({ length: this.totalPages() }, (_, index) => index + 1));

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
    this.currentPage.set(1);
  }

  updateSearchTerm(value: string): void {
    this.searchTerm.set(value);
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    this.currentPage.set(Math.min(Math.max(page, 1), this.totalPages()));
  }

  mapUrl(store: Tienda): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.ubicacion || store.nombre || 'Plaza Aventura')}`;
  }
}
