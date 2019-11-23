import { ModeloDTO } from './../../models/modelo.dto';
import { Veiculo } from './../../models/veiculo';
import { ActivatedRoute } from '@angular/router';
import { VeiculoPesquisa } from './../../models/pesquisa/veiculo-pesquisa';

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { VeiculoService } from 'src/services/domain/veiculo.service';
import { VeiculoDTO } from 'src/models/veiculo.dto';

import { MatPaginator } from '@angular/material';
import { merge} from 'rxjs';
import { tap } from 'rxjs/operators';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.css']
})
export class VeiculosComponent implements OnInit {

  pageSize: number = 24;
  veiculos: VeiculoDTO[];
  tamanhoLista: number;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  ultimaPagina: boolean;
  primeiraPagina: boolean;
  veiculoPesquisa: VeiculoPesquisa = <VeiculoPesquisa>{};


  constructor(
    private veiculoService: VeiculoService,
    private route: ActivatedRoute,

  ) {
  }

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false
  };

  ngOnInit() {
    let veiculoPesquisaUrl = this.route.snapshot.queryParams as VeiculoPesquisa;
    this.pegarParamsUrl(veiculoPesquisaUrl);
    this.findAllVeiculosPage();
  }

  pegarParamsUrl(veiculoPesquisaUrl) {
    this.veiculoPesquisa.marca = veiculoPesquisaUrl.marca;
    this.veiculoPesquisa.modelo = veiculoPesquisaUrl.modelo;
    this.veiculoPesquisa.versao =  veiculoPesquisaUrl.versao;
    this.veiculoPesquisa.dePreco =  veiculoPesquisaUrl.dePreco;
    this.veiculoPesquisa.atePreco =  veiculoPesquisaUrl.atePreco;
    this.veiculoPesquisa.deAno =  veiculoPesquisaUrl.deAno;
    this.veiculoPesquisa.ateAno =  veiculoPesquisaUrl.ateAno;
    this.veiculoPesquisa.deKm =  veiculoPesquisaUrl.deKm;
    this.veiculoPesquisa.ateKm =  veiculoPesquisaUrl.ateKm;
    this.veiculoPesquisa.cores =  veiculoPesquisaUrl.cores;
    this.veiculoPesquisa.tipos =  veiculoPesquisaUrl.tipos;
    this.veiculoPesquisa.cambios =  veiculoPesquisaUrl.cambios;
    this.veiculoPesquisa.combustiveis =  veiculoPesquisaUrl.combustiveis;
    this.veiculoPesquisa.adicionais =  veiculoPesquisaUrl.adicionais;
    this.veiculoPesquisa.opcionais =  veiculoPesquisaUrl.opcionais;
    this.veiculoPesquisa.direction =  veiculoPesquisaUrl.direcion;
    this.veiculoPesquisa.orderBy =  veiculoPesquisaUrl.orderBy;
  }

  ngAfterViewInit() {
    this.paginator.initialized.subscribe(() => this.paginator.pageIndex = 0)

    merge(this.paginator.page).pipe(
      tap(() => {
        this.findAllVeiculosPage();
      })
    ).subscribe();
  }

  findAllVeiculosPage() {
    console.log("Busca todos por aqui")
    this.veiculoService.findVeiculosCustomPage(this.paginator.pageIndex, this.paginator.pageSize, this.veiculoPesquisa)
      .subscribe((response) => {
        this.veiculos = response['content'];
        this.tamanhoLista = response['totalElements'];
        this.primeiraPagina = response['first'];
        this.ultimaPagina = response['last'];
      })
  }

  proximaPagina(){
    this.paginator.nextPage();
  }

  paginaAnterior(){
    this.paginator.previousPage();
  }

  receberPesquisaVeiculo(veiculoPesquisa) {
    this.veiculoPesquisa = veiculoPesquisa;
  }

  receberTamanhoListaFiltro(tamanhoLista) {
    this.tamanhoLista = tamanhoLista;
  }

  receberVeiculoPesquisa(veiculoPesquisa) {
    this.veiculoPesquisa = veiculoPesquisa;
  }

  receberParametrosDePesquisa(parametrosVeiculoPesquisa){
    console.log("RECEBEU PARAMETROS")
    this.veiculoPesquisa = parametrosVeiculoPesquisa;
    this.findAllVeiculosPage();
  }

  mudarOrdenacao(event) {
    console.log(this.veiculoPesquisa);
    switch (event.target.value) {
      case "menor-preco":
        this.veiculoPesquisa['orderBy'] = 'preco';
        this.veiculoPesquisa['direction'] = 'ASC';
        break;

      case "maior-preco":
        this.veiculoPesquisa.orderBy  = 'preco';
        this.veiculoPesquisa.direction  = 'DESC';
        break;

      case "menor-ano":
        this.veiculoPesquisa.orderBy = 'ano';
        this.veiculoPesquisa.direction = 'ASC';
        break;

      case "maior-ano":
        console.log(this.veiculoPesquisa);
        this.veiculoPesquisa.orderBy = 'ano';
        this.veiculoPesquisa.direction = 'DESC';
        break;
    }
    this.findAllVeiculosPage();
  }

}
