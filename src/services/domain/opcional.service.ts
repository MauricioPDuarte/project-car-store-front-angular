import { OpcionalDTO } from './../../models/opcional.dto';
import {  MarcaDTO } from '../../models/marca.dto';
import { API_CONFIG } from '../../config/api.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpcionalService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<OpcionalDTO[]> {
    return this.http.get<OpcionalDTO[]>(`${API_CONFIG.baseUrl}/opcionais`);
  }

}
