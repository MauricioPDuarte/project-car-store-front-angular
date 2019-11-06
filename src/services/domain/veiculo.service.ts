import { API_CONFIG } from 'src/config/api.config';
import { VeiculoNewDTO } from './../../models/veiculo.new.dto';
import { ActivatedRoute } from '@angular/router';
import { VeiculoPesquisa } from './../../models/pesquisa/veiculo-pesquisa';
import { VeiculoDTO } from './../../models/veiculo.dto';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veiculo } from 'src/models/veiculo';
import { Picture } from 'src/models/picture';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) { }

  /*
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

  findVeiculoByMarcaPage(marca: string, page: number = 0, pageSize: number = 24, sortDirection: string = "ASC"): Observable<VeiculoDTO[]> {
    return this.http.get<VeiculoDTO[]>(`${API_CONFIG.baseUrl}/veiculos/buscar/page/${marca}?page=${page}&linesPerPage=${pageSize}&direction=${sortDirection}`);
  }
  */

  turnPictureThumb(vehicleId, pictureId) {
    return this.http.post(`${API_CONFIG.baseUrl}/veiculos/${vehicleId}/picture/${pictureId}`, null);
  }

  savePicturesVehicle(vehicleId, files: FormData): Observable<Picture[]> {
    return this.http.post<Picture[]>(`${API_CONFIG.baseUrl}/veiculos/picture/${vehicleId}`, files);
  }

  findById(id: string): Observable<Veiculo> {
    return this.http.get<Veiculo>(`${API_CONFIG.baseUrl}/veiculos/${id}`);
  }

  saveCar(veiculo: VeiculoNewDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/veiculos`, veiculo, {
      observe: 'response',
      responseType: 'text'
    })
  }

  findAllCarsPage(page: number = 0, pageSize: number = 24, sortDirection: string = "ASC"): Observable<VeiculoDTO[]> {
    return this.http.get<VeiculoDTO[]>(`${API_CONFIG.baseUrl}/veiculos/page?page=${page}&linesPerPage=${pageSize}&direction=${sortDirection}`);
  }

  findVeiculosCustomPage(page, linesPerPage, orderBy: string = 'ASC', veiculoPesquisa: VeiculoPesquisa): Observable<VeiculoDTO[]> {

    let params = new HttpParams()
      .set("marca", veiculoPesquisa.marca != null ? veiculoPesquisa.marca : '')
      .set("modelo", veiculoPesquisa.modelo != null ? veiculoPesquisa.modelo : '')
      .set("opcionais", veiculoPesquisa.opcionais != null ? veiculoPesquisa.opcionais : '')
      .set("adc", veiculoPesquisa.adicionais != null ? veiculoPesquisa.adicionais : '')
      .set("depreco", veiculoPesquisa.dePreco != null ? veiculoPesquisa.dePreco : '')
      .set("atepreco", veiculoPesquisa.atePreco != null ? veiculoPesquisa.atePreco : '')
      .set("deano", veiculoPesquisa.deAno != null ? veiculoPesquisa.deAno : '')
      .set("ateano", veiculoPesquisa.ateAno != null ? veiculoPesquisa.ateAno : '')
      .set("dekm", veiculoPesquisa.deKm != null ? veiculoPesquisa.deKm : '')
      .set("atekm", veiculoPesquisa.ateKm != null ? veiculoPesquisa.ateKm : '')
      .set("cores", veiculoPesquisa.cores != null ? veiculoPesquisa.cores : '')
      .set("cambios", veiculoPesquisa.cambios != null ? veiculoPesquisa.cambios : '')
      .set("combustiveis", veiculoPesquisa.combustiveis != null ? veiculoPesquisa.combustiveis : '')
      .set("tipos", veiculoPesquisa.tipos != null ? veiculoPesquisa.tipos : '')
      .set("linesPerPage", linesPerPage != null ? linesPerPage : 24)
      .set("page", page != null ? page : 0)
      .set("direction", orderBy != null ? orderBy : 'ASC')


    let url = `${API_CONFIG.baseUrl}/veiculos/buscar/avancada`;
    return this.http.get<VeiculoDTO[]>(url, { params: params });
  }
}
