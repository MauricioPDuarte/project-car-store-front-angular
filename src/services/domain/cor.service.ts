import { CorDTO } from './../../models/cor.dto';
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
export class CorService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<CorDTO[]> {
    return this.http.get<CorDTO[]>(`${API_CONFIG.baseUrl}/cores`);
  }

}
