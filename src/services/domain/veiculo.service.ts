import { API_CONFIG } from './../../config/api.config';
import { VeiculoDTO } from './../../models/veiculo.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<VeiculoDTO[]> {
    return this.http.get<VeiculoDTO[]>(`${API_CONFIG.baseUrl}/veiculos`);
  }

  findVeiculoByMarca(marca: string): Observable<VeiculoDTO[]> {
    return this.http.get<VeiculoDTO[]>(`${API_CONFIG.baseUrl}/veiculos/buscar/${marca}`);
  }

  findVeiculoByModelo(marca: string, modelo: string) {
    return this.http.get<VeiculoDTO[]>(`${API_CONFIG.baseUrl}/veiculos/buscar/${marca}/${modelo}`);
  }

  findAllCarsPage(page: number = 0, pageSize: number = 24, sortDirection: string = "ASC"): Observable<VeiculoDTO[]> {
    return this.http.get<VeiculoDTO[]>(`${API_CONFIG.baseUrl}/veiculos/page?page=${page}&linesPerPage=${pageSize}&direction=${sortDirection}`);
  }
}
