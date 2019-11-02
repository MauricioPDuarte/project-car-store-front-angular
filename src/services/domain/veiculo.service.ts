import { ActivatedRoute } from '@angular/router';
import { VeiculoPesquisa } from './../../models/pesquisa/veiculo-pesquisa';
import { API_CONFIG } from './../../config/api.config';
import { VeiculoDTO } from './../../models/veiculo.dto';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) { }

  findAll(): Observable<VeiculoDTO[]> {
    return this.http.get<VeiculoDTO[]>(`${API_CONFIG.baseUrl}/veiculos`);
  }

  //Buscar todos (sem paginacao)

  findVeiculoByMarca(marca: string): Observable<VeiculoDTO[]> {
    return this.http.get<VeiculoDTO[]>(`${API_CONFIG.baseUrl}/veiculos/buscar/${marca}`);
  }

  findVeiculoByModelo(marca: string, modelo: string) {
    return this.http.get<VeiculoDTO[]>(`${API_CONFIG.baseUrl}/veiculos/buscar/${marca}/${modelo}`);
  }

  //Buscar todos paginado

  findAllCarsPage(page: number = 0, pageSize: number = 24, sortDirection: string = "ASC"): Observable<VeiculoDTO[]> {

    return this.http.get<VeiculoDTO[]>(`${API_CONFIG.baseUrl}/veiculos/page?page=${page}&linesPerPage=${pageSize}&direction=${sortDirection}`);
  }

  findVeiculoByMarcaPage(marca: string, page: number = 0, pageSize: number = 24, sortDirection: string = "ASC"): Observable<VeiculoDTO[]> {
    return this.http.get<VeiculoDTO[]>(`${API_CONFIG.baseUrl}/veiculos/buscar/page/${marca}?page=${page}&linesPerPage=${pageSize}&direction=${sortDirection}`);
  }

  findVeiculosCustomPage(page: number = 0, linesPerPage: number = 24, orderBy: string = 'ASC', veiculoPesquisa: VeiculoPesquisa): Observable<VeiculoDTO[]> {

    let params = new HttpParams()
      .set("marca", veiculoPesquisa.marca != null ? veiculoPesquisa.marca : '')
      .set("modelo", veiculoPesquisa.modelo != null ? veiculoPesquisa.modelo : '')
      .set("opcionais", veiculoPesquisa.opcionais != null ? veiculoPesquisa.opcionais : '')
      .set("adc", veiculoPesquisa.adicionais != null ? veiculoPesquisa.adicionais : '')
      .set("depreco", veiculoPesquisa.dePreco != null ? veiculoPesquisa.dePreco : '')
      .set("atepreco", veiculoPesquisa.atePreco != null ? veiculoPesquisa.atePreco : '')
      .set("deano", veiculoPesquisa.deAno != null ? veiculoPesquisa.deAno : '')
      .set("ateano", veiculoPesquisa.ateAno != null ? veiculoPesquisa.ateAno : '')

    let url = `${API_CONFIG.baseUrl}/veiculos/buscar/avancada`;
    return this.http.get<VeiculoDTO[]>(url, { params: params });
  }
}
