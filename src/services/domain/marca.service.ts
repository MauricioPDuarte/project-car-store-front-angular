import {  MarcaDTO } from './../../models/marca.dto';
import { API_CONFIG } from '../../config/api.config';
import { VeiculoDTO } from '../../models/veiculo.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModeloDTO } from 'src/models/modelo.dto';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<MarcaDTO[]> {
    return this.http.get<MarcaDTO[]>(`${API_CONFIG.baseUrl}/marcas`);
  }

  findModeloPorMarca(marcaId: string): Observable<ModeloDTO[]> {
    return this.http.get<ModeloDTO[]>(`${API_CONFIG.baseUrl}/marcas/${marcaId}/modelos`);
  }


}
