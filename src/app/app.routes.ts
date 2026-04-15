import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/pages/home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'directorio',
    loadComponent: () =>
      import('./features/directory/pages/directory/directory').then((m) => m.DirectoryComponent),
  },
  {
    path: 'galeria',
    loadComponent: () => import('./features/gallery/pages/gallery/gallery').then((m) => m.GalleryComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
