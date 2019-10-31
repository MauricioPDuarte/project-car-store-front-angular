import { AdicionalDTO } from 'src/models/adicional.dto';
import { API_CONFIG } from '../../config/api.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdicionalService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<AdicionalDTO[]> {
    return this.http.get<AdicionalDTO[]>(`${API_CONFIG.baseUrl}/adicionais`);
  }


}
