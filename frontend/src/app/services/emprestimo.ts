import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emprestimo } from '../models/emprestimo';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {

  private api = 'http://localhost:8080/emprestimos';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(this.api);
  }

  listarAtivos(): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(`${this.api}/ativos`);
  }

  listarAtrasados(): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(`${this.api}/atrasados`);
  }

  emprestar(emprestimo: Emprestimo): Observable<Emprestimo> {
    return this.http.post<Emprestimo>(`${this.api}/emprestar`, emprestimo);
  }

  devolver(id: number): Observable<Emprestimo> {
    return this.http.post<Emprestimo>(`${this.api}/${id}/devolver`, {});
  }
}
