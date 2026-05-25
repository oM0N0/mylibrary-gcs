import { Routes } from '@angular/router';
import { CategoriaList } from './pages/categorias/categoria-list/categoria-list';
import { LivroList } from './pages/livros/livro-list/livro-list';
import { EmprestimoList } from './pages/emprestimos/emprestimo-list/emprestimo-list';
import { Dashboard } from './pages/dashboard/dashboard';
import { Atrasados } from './pages/atrasados/atrasados';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'categorias', component: CategoriaList },
  { path: 'livros', component: LivroList },
  { path: 'emprestimos', component: EmprestimoList },
  { path: 'atrasados', component: Atrasados }
];
