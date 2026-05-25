import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from '../models/livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private api = 'http://localhost:8080/livros';

  constructor(private http: HttpClient) {}

  listar(categoriaId?: string, status?: string, busca?: string): Observable<Livro[]> {
    let params = new HttpParams();

    if (categoriaId) {
      params = params.set('categoriaId', categoriaId);
    }

    if (status) {
      params = params.set('status', status);
    }

    if (busca) {
      params = params.set('busca', busca);
    }

    return this.http.get<Livro[]>(this.api, { params });
  }

  salvar(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(this.api, livro);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
