import { Routes } from '@angular/router';
import { CategoriaList } from './pages/categorias/categoria-list/categoria-list';

export const routes: Routes = [
  { path: '', redirectTo: 'categorias', pathMatch: 'full' },
  { path: 'categorias', component: CategoriaList }
];
