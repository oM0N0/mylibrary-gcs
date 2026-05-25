import { Routes } from '@angular/router';
import { CategoriaList } from './pages/categorias/categoria-list/categoria-list';
import { LivroList } from './pages/livros/livro-list/livro-list';
import { EmprestimoList } from './pages/emprestimos/emprestimo-list/emprestimo-list';

export const routes: Routes = [
  { path: '', redirectTo: 'categorias', pathMatch: 'full' },
  { path: 'categorias', component: CategoriaList },
  { path: 'livros', component: LivroList },
  { path: 'emprestimos', component: EmprestimoList }
];
