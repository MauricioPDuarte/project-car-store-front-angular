import { TipoDTO } from './../../models/tipo.dto';
import { API_CONFIG } from '../../config/api.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<TipoDTO[]> {
    return this.http.get<TipoDTO[]>(`${API_CONFIG.baseUrl}/tipos`);
  }

}
