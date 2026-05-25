import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dashboard } from '../models/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private api = 'http://localhost:8080/dashboard';

  constructor(private http: HttpClient) {}

  obterResumo(): Observable<Dashboard> {
    return this.http.get<Dashboard>(this.api);
  }
}
