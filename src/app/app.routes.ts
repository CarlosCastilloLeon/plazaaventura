import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/pages/home/home').then((m) => m.HomeComponent),
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
