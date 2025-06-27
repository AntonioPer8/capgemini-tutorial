import { Routes } from '@angular/router';

export const routes: Routes = [

{ path: '', redirectTo: '/games', pathMatch: 'full'}, //Regla por defecto,es decir que si no se pone ruta,se redirigirá a este 
{ path: 'categories', loadComponent: () => import('./category/category-list/category-list').then(m => m.CategoryList)},
{ path: 'authors', loadComponent: () => import('./author/author-list/author-list').then(m => m.AuthorList)},
{ path: 'games', loadComponent: () => import('./game/game-list/game-list').then(m => m.GameList)},
{ path: 'clients', loadComponent: () => import('./clients/clients-list/clients-list').then(m => m.ClientsList)},
{ path: 'prestamo', loadComponent: () => import('./prestamo/prestamo-list/prestamo-list').then(m => m.PrestamoList)},

];


