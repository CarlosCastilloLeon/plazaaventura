import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/pages/home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'locales/:slug',
    loadComponent: () =>
      import('./features/businesses/pages/business-detail/business-detail').then((m) => m.BusinessDetailComponent),
  },
  {
    path: 'reservation',
    loadComponent: () =>
      import('./features/reservation/pages/reservation/reservation').then((m) => m.ReservationComponent),
  },
  {
    path: 'carrusel-negocios',
    loadComponent: () =>
      import('./features/carrusel-negocios/carrusel-negocios').then((m) => m.CarruselNegocios),
  },
  {
    path: 'gallery',
    loadComponent: () => import('./features/gallery/gallery').then((m) => m.Gallery),
  },
  {
    path: 'tiendas/:id',
    loadComponent: () => import('./tiendas/tiendas').then((m) => m.Tiendas),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
