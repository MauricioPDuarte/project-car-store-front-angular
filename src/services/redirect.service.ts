
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MarcaDTO } from 'src/models/marca.dto';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  params: URLSearchParams;
  
  constructor(
    private http: HttpClient,
    private router: Router) {
    
   }

   receberMarca(marca: string) {
    this.params.append('marca', marca);
   }

  receberPesquisaVeiculo() {
  }

  montarParametros() {

    let teste = this.params.toString();
    console.log(teste);
    //this.router.navigate([], { queryParams: { teste } });
  }

}
