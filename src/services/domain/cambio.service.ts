import { CambioDTO } from './../../models/cambio.dto';
import { API_CONFIG } from '../../config/api.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CambioService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<CambioDTO[]> {
    return this.http.get<CambioDTO[]>(`${API_CONFIG.baseUrl}/cambios`);
  }


}
