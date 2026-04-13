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
    path: '**',
    redirectTo: '',
  },
];
