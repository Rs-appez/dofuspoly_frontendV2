import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/home/pages/home/home').then((m) => m.Home),
    title: 'Home',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('@features/login/login.routes').then((m) => m.boardRoutes),
    title: 'Login',
  },
  {
    path: 'board',
    loadChildren: () =>
      import('@features/board/board.routes').then((m) => m.boardRoutes),
    title: 'Game Board',
  },
];
