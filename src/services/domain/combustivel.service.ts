import { API_CONFIG } from '../../config/api.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CombustivelDTO } from 'src/models/combustivel.dto';

@Injectable({
  providedIn: 'root'
})
export class CombustivelService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<CombustivelDTO[]> {
    return this.http.get<CombustivelDTO[]>(`${API_CONFIG.baseUrl}/combustiveis`);
  }


}
