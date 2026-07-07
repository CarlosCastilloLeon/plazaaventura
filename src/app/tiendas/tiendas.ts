import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SitePublicFooterComponent } from '../core/layout/site-public-footer/site-public-footer';
import { SitePublicHeaderComponent } from '../core/layout/site-public-header/site-public-header';
import { Tienda } from '../shared/interface/tienda.interface';
import tiendasData from '../BDlocal/tiendas.json';

@Component({
  standalone: true,
  selector: 'app-tiendas',
  imports: [CommonModule, SitePublicHeaderComponent, SitePublicFooterComponent],
  templateUrl: './tiendas.html',
  styleUrls: ['./tiendas.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tiendas {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  tienda = signal<Tienda | undefined>(undefined);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isNaN(id)) {
      this.tienda.set((tiendasData as Tienda[]).find((item) => item.tiendaId === id));
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
