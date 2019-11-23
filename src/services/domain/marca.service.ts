import { tap } from 'rxjs/operators';
import { API_CONFIG } from './../../config/api.config';
import { MarcaDTO } from './../../models/marca.dto';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ModeloDTO } from 'src/models/modelo.dto';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private http: HttpClient) { }

   marcaEvent: EventEmitter<null> = new EventEmitter<null>();

  findAll(): Observable<MarcaDTO[]> {
      return this.http.get<MarcaDTO[]>(`${API_CONFIG.baseUrl}/marcas`);
  }

  save(marca: MarcaDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/marcas`, marca)
      .pipe(tap(() => this.marcaEvent.emit()))
  }

  findModeloPorMarca(marcaId: string): Observable<ModeloDTO[]> {
    return this.http.get<ModeloDTO[]>(`${API_CONFIG.baseUrl}/marcas/${marcaId}/modelos`);
  }

  deleteMarcaById(id: string) {
    return this.http.delete(`${API_CONFIG.baseUrl}/marcas/${id}`)
      .pipe(tap(() => this.marcaEvent.emit()));
  }

  findMarcaById(id: string): Observable<MarcaDTO> {
    return this.http.get<MarcaDTO>(`${API_CONFIG.baseUrl}/marcas/${id}`);
  }

}
 