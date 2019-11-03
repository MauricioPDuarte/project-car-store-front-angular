import { API_CONFIG } from 'src/config/api.config';
import { ColaboradorDTO } from './../../models/colaborador.dto';
import { AdicionalDTO } from 'src/models/adicional.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<ColaboradorDTO[]> {
    return this.http.get<ColaboradorDTO[]>(`${API_CONFIG.baseUrl}/colaboradores`);
  }

  findByEmail(email: string): Observable<ColaboradorDTO>{
    return this.http.get<ColaboradorDTO>(`${API_CONFIG.baseUrl}/colaboradores/email?email=${email}`);
  }

}
