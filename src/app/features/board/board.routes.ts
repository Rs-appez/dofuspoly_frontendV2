import { Routes } from '@angular/router';

export const boardRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/game-area/game-area').then((m) => m.GameArea),
  },
];
