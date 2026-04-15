import { NgOptimizedImage } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-directory',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './directory.html',
  styleUrl: './directory.scss',
})
export class DirectoryComponent {
  protected readonly searchTerm = signal('');
  protected readonly selectedLocal = signal('all');
  protected readonly sortBy = signal<'name-asc' | 'name-desc' | 'local-asc' | 'local-desc'>('name-asc');
  protected readonly page = signal(1);
  protected readonly pageSize = 5;

  protected readonly directoryItems = [
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
    {
      logo: '/img/logos-tiendas/ATT%20vertical-01.jpg',
      name: 'ATT',
      schedule: 'Lun-Vie 9:00am a 06:00pm',
      local: 'Local 12',
    },
    {
      logo: '/img/logos-tiendas/italianlogo.png',
      name: 'The Italian Coffee Company',
      schedule: 'Lun-Vie 9:00am a 06:00pm',
      local: 'Local 15',
    },
    {
      logo: '/img/logos-tiendas/logo.PNG',
      name: 'Caffe Brisant',
      schedule: 'Lun-Vie 9:00am a 06:00pm',
      local: 'Local 18',
    },
  ];

  protected readonly localOptions = computed(() =>
    ['all', ...new Set(this.directoryItems.map((item) => item.local))],
  );

  protected readonly filteredItems = computed(() => {
    const query = this.searchTerm().trim().toLowerCase();
    const local = this.selectedLocal();

    const filtered = this.directoryItems.filter((item) => {
      const matchesQuery =
        query.length === 0 ||
        item.name.toLowerCase().includes(query) ||
        item.local.toLowerCase().includes(query);

      const matchesLocal = local === 'all' || item.local === local;

      return matchesQuery && matchesLocal;
    });

    const sorted = [...filtered];
    const mode = this.sortBy();

    sorted.sort((a, b) => {
      if (mode === 'name-asc') {
        return a.name.localeCompare(b.name, 'es');
      }

      if (mode === 'name-desc') {
        return b.name.localeCompare(a.name, 'es');
      }

      const aLocal = Number(a.local.replace(/\D/g, ''));
      const bLocal = Number(b.local.replace(/\D/g, ''));

      if (mode === 'local-asc') {
        return aLocal - bLocal;
      }

      return bLocal - aLocal;
    });

    return sorted;
  });

  protected readonly totalPages = computed(() => {
    const total = this.filteredItems().length;
    return Math.max(1, Math.ceil(total / this.pageSize));
  });

  protected readonly paginatedItems = computed(() => {
    const currentPage = this.page();
    const start = (currentPage - 1) * this.pageSize;
    return this.filteredItems().slice(start, start + this.pageSize);
  });

  protected onSearchChange(value: string): void {
    this.searchTerm.set(value);
    this.page.set(1);
  }

  protected onLocalChange(value: string): void {
    this.selectedLocal.set(value);
    this.page.set(1);
  }

  protected onSortChange(value: string): void {
    const validModes = ['name-asc', 'name-desc', 'local-asc', 'local-desc'];
    const mode = validModes.includes(value) ? value : 'name-asc';
    this.sortBy.set(mode as 'name-asc' | 'name-desc' | 'local-asc' | 'local-desc');
    this.page.set(1);
  }

  protected clearFilters(): void {
    this.searchTerm.set('');
    this.selectedLocal.set('all');
    this.sortBy.set('name-asc');
    this.page.set(1);
  }

  protected goToPreviousPage(): void {
    this.page.update((current) => Math.max(1, current - 1));
  }

  protected goToNextPage(): void {
    const total = this.totalPages();
    this.page.update((current) => Math.min(total, current + 1));
  }
}
