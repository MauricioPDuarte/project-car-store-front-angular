import { VersaoDTO } from './../../models/versao.dto';
import { API_CONFIG } from './../../config/api.config';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  constructor(private http: HttpClient) { }

  findVersoesPorModelo(modeloId: string): Observable<VersaoDTO[]> {
    return this.http.get<VersaoDTO[]>(`${API_CONFIG.baseUrl}/modelos/${modeloId}/versoes`);
  }


}
 