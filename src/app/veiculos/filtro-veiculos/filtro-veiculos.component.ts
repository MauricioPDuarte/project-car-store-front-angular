import { VersaoDTO } from './../../../models/versao.dto';
import { TipoDTO } from './../../../models/tipo.dto';
import { TipoService } from './../../../services/domain/tipo.service';
import { CombustivelDTO } from 'src/models/combustivel.dto';
import { CombustivelService } from './../../../services/domain/combustivel.service';
import { CambioDTO } from './../../../models/cambio.dto';
import { CambioService } from './../../../services/domain/cambio.service';
import { CorDTO } from './../../../models/cor.dto';
import { CorService } from './../../../services/domain/cor.service';
import { Observable, Subject, throwError } from 'rxjs';
import { AdicionalService } from './../../../services/domain/adicional.service';
import { AdicionalDTO } from './../../../models/adicional.dto';
import { OpcionalService } from './../../../services/domain/opcional.service';
import { OpcionalDTO } from './../../../models/opcional.dto';
import { VeiculoPesquisa } from './../../../models/pesquisa/veiculo-pesquisa';
import { MatPaginator } from '@angular/material';
import { VeiculoService } from './../../../services/domain/veiculo.service';
import { VeiculoDTO } from 'src/models/veiculo.dto';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MarcaService } from 'src/services/domain/marca.service';
import { MarcaDTO } from 'src/models/marca.dto';
import { ModeloDTO } from 'src/models/modelo.dto';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, tap, distinctUntilChanged, last } from 'rxjs/operators';
import { ModeloService } from 'src/services/domain/modelo.service';

@Component({
  selector: 'app-filtro-veiculos',
  templateUrl: './filtro-veiculos.component.html',
  styleUrls: ['./filtro-veiculos.component.css']
})
export class FiltroVeiculosComponent implements OnInit {

  @Output() veiculos = new EventEmitter<VeiculoDTO[]>();
  @Output() tamanhoLista = new EventEmitter<number>();
  @Output() vPesquisa = new EventEmitter<VeiculoPesquisa>();
  @Output() parametrosDePesquisa = new EventEmitter<VeiculoPesquisa>();
  @Input() paginator: MatPaginator;
  @Input() veiculoPesquisa: VeiculoPesquisa;

  marcas: MarcaDTO[];
  modelos: ModeloDTO[];
  formGroup: FormGroup;
  //veiculoPesquisa: VeiculoPesquisa;
  opcionais: OpcionalDTO[];
  adicionais: AdicionalDTO[];
  deAno = new Subject<string>();
  ateAno = new Subject<string>();
  deKm = new Subject<string>();
  ateKm = new Subject<string>();
  cores: CorDTO[];
  cambios: CambioDTO[];
  combustiveis: CombustivelDTO[];
  tipos: TipoDTO[];
  versoes: VersaoDTO[];

  constructor(
    private marcaService: MarcaService,
    private formBuilder: FormBuilder,
    private veiculoService: VeiculoService,
    private router: Router,
    private route: ActivatedRoute,
    private opcionalService: OpcionalService,
    private adicionalService: AdicionalService,
    private corService: CorService,
    private cambioService: CambioService,
    private combustivelService: CombustivelService,
    private tipoService: TipoService,
    private modeloService: ModeloService,
  ) {
    //this.veiculoPesquisa = new VeiculoPesquisa;
    this.formGroup = this.formBuilder.group({
      marca: [null, []],
      modelo: [null, []],
      versao: [null, []],
      opcionais: [null, []],
      adicionais: [null, []],
      depreco: [null, []],
      atepreco: [null, []],
      cores: [null, []],
      cambios: [null, []],
      combustiveis: [null, []],
      tipos: [null, []]
    })
  }

  ngOnInit() {
    console.log(this.veiculoPesquisa)
   // this.veiculoPesquisa = new VeiculoPesquisa;
   
    this.carregarMarcas();
    this.carregarOpcionais();
    this.carregarAdicionais();
    this.carregarCores();
    this.carregarCambios();
    this.carregarCombustiveis();
    this.carregarTipos();
    this.buscaDeAno();
    this.buscaAteAno();
  }

  carregarMarcas() {
    this.marcaService.findAll().subscribe((response) => {
      this.marcas = response;
    }, error => { });
  }

  carregarOpcionais() {
    this.opcionalService.findAll().subscribe((response) => {
      this.opcionais = response;
    }, error => { })
  }

  carregarAdicionais() {
    this.adicionalService.findAll().subscribe((response) => {
      this.adicionais = response;
    }, error => { });
  }

  carregarCores() {
    this.corService.findAll()
      .subscribe((response) => {
        this.cores = response;
      }, error => { });
  }

  carregarCambios() {
    this.cambioService.findAll()
      .subscribe((response) => {
        this.cambios = response;
      }, error => { });
  }

  carregarCombustiveis() {
    this.combustivelService.findAll()
      .subscribe((response) => {
        this.combustiveis = response;
      }, error => { });
  }

  carregarTipos() {
    this.tipoService.findAll()
      .subscribe((response) => {
        this.tipos = response;
      }, error => { });
  }

  carregarVersoes() {
    let modeloId = this.formGroup.value.modelo.id;
    this.modeloService.findVersoesPorModelo(modeloId)
      .subscribe((response) => {
        this.versoes = response;
      }, error => { });
  }

  //Buscar veiculos
  buscarVeiculosEModelosPorMarca() {
    let marca = this.formGroup.value.marca;
    console.log("Busca de veiculos e modelos por MARCA", marca.id)
    if (marca != null) {
      this.filtrarVeiculosPorMarca();
      this.marcaService.findModeloPorMarca(marca.id).subscribe((response) => {
        this.modelos = response;
      }, error => { });
    }else{
      console.log("Busca de veiculos e modelos por MARCA (BUSCAR TODOS)")
      this.veiculoPesquisa.marca = null;
      this.veiculoPesquisa.modelo = null;
      this.veiculoPesquisa.versao = null;
      this.modelos = null;
      //this.buscarVeiculosComFiltro();
      this.buscaAvancadaDeVeiculos();
    }
  }

  filtrarVeiculosPorMarca() {
    console.log("Busca de veiculos por MARCA")
    let marca =  this.formGroup.value.marca;
    if(marca != null){
      this.veiculoPesquisa.marca = marca.nome;
    }
    this.versoes = null;
    this.veiculoPesquisa.versao = null;
    this.veiculoPesquisa.modelo = null;
    //this.buscarVeiculosComFiltro();
    this.buscaAvancadaDeVeiculos();
  }

  filtrarVeiculosPorModelo() {
    let modelo = this.formGroup.value.modelo;
    if(modelo != null){
      this.carregarVersoes();
      this.veiculoPesquisa.modelo = modelo.nome;
    }else{
      this.veiculoPesquisa.modelo = null;
    }
    this.versoes = null;
    this.veiculoPesquisa.versao = null;
    //this.buscarVeiculosComFiltro();
    this.buscaAvancadaDeVeiculos();
  }

  filtrarVeiculosPorVersao() {
    let versao = this.formGroup.value.versao;
    if(versao != null){
      this.veiculoPesquisa.versao = versao.nome;
    }else{
      this.veiculoPesquisa.versao = null;
    }
    //this.buscarVeiculosComFiltro();
    this.buscaAvancadaDeVeiculos();
  }

  filtrarPorOpcionais() {
    let opcionais = this.formGroup.value.opcionais;

    let opcionaisString = '';
    for (let opcional of opcionais) {
      opcionaisString += `${opcional},`;
    }

    if (opcionaisString == '') {
      opcionaisString = null;
    }

    this.veiculoPesquisa.opcionais = opcionaisString;

   // this.buscarVeiculosComFiltro();
   this.buscaAvancadaDeVeiculos();
  }

  filtrarPorAdicionais() {
    let adicionais = this.formGroup.value.adicionais;
    let adicionaisString = '';
    for (let adicional of adicionais) {
      adicionaisString += `${adicional},`;
    }

    if (adicionaisString == '') {
      adicionaisString = null;
    }

    this.veiculoPesquisa.adicionais = adicionaisString;
    //this.buscarVeiculosComFiltro();
    this.buscaAvancadaDeVeiculos();
  }

  filtrarPorCores() {
    let cores = this.formGroup.value.cores;
    let coresString = '';
    for (let cor of cores) {
      coresString += `${cor.nome},`;
    }

    if (coresString == '') {
      coresString = null;
    }

    this.veiculoPesquisa.cores = coresString;
    //this.buscarVeiculosComFiltro();
    this.buscaAvancadaDeVeiculos();
  }

  filtrarPorCambios() {
    let cambios = this.formGroup.value.cambios;
    let cambiosString = '';
    for (let cambio of cambios) {
      cambiosString += `${cambio.nome},`;
    }

    if (cambiosString == '') {
      cambiosString = null;
    }

    this.veiculoPesquisa.cambios = cambiosString;
    //this.buscarVeiculosComFiltro();
    this.buscaAvancadaDeVeiculos();
  }

  filtrarPorTipos() {
    let tipos = this.formGroup.value.tipos;
    let tiposString = '';
    for (let tipo of tipos) {
      tiposString += `${tipo.nome},`;
    }

    if (tiposString == '') {
      tiposString = null;
    }

    this.veiculoPesquisa.tipos = tiposString;
    //this.buscarVeiculosComFiltro();
    this.buscaAvancadaDeVeiculos();
  }

  filtrarPorCombustiveis() {
    let combustiveis = this.formGroup.value.combustiveis;
    let combustiveisString = '';
    for (let combustivel of combustiveis) {
      combustiveisString += `${combustivel.nome},`;
    }

    if (combustiveisString == '') {
      combustiveisString = null;
    }

    this.veiculoPesquisa.combustiveis = combustiveisString;
   // this.buscarVeiculosComFiltro();
   this.buscaAvancadaDeVeiculos();
  }

  filtrarPorPrecoDe(depreco: string) {
    if (depreco == '') {
      this.veiculoPesquisa.dePreco = null;
    } else {
      this.veiculoPesquisa.dePreco = depreco;
    }
    //this.buscarVeiculosComFiltro();
    this.buscaAvancadaDeVeiculos();
  }

  filtrarPorPrecoAte(atepreco) {
    if (atepreco == '') {
      this.veiculoPesquisa.atePreco = null;
    } else {
      this.veiculoPesquisa.atePreco = atepreco;
    }
    //this.buscarVeiculosComFiltro();
    this.buscaAvancadaDeVeiculos();
  }

  filtrarDeAno(deano: string) {
    this.deAno.next(deano);
  }

  buscaDeAno() {
    this.deAno.pipe(
      debounceTime(500),
      distinctUntilChanged()

    ).subscribe((res) => {
      if (res.length == 4) {
        this.veiculoPesquisa.deAno = res;
        //this.buscarVeiculosComFiltro();
        this.buscaAvancadaDeVeiculos();
      }
      if (res.length < 4 && this.veiculoPesquisa.deAno != null) {
        this.veiculoPesquisa.deAno = null;
        //this.buscarVeiculosComFiltro();
        this.buscaAvancadaDeVeiculos();
      }
    })
  }

  filtrarAteAno(ateano: string) {
    this.ateAno.next(ateano);
  }

  buscaAteAno() {
    this.ateAno.pipe(
      debounceTime(500),
      distinctUntilChanged()

    ).subscribe((res) => {
      if (res.length == 4) {
        this.veiculoPesquisa.ateAno = res;
       // this.buscarVeiculosComFiltro();
       this.buscaAvancadaDeVeiculos();
      }
      if (res.length < 4 && this.veiculoPesquisa.ateAno != null) {
        this.veiculoPesquisa.ateAno = null;
        //this.buscarVeiculosComFiltro();
        this.buscaAvancadaDeVeiculos();
      }
    })
  }

  filtrarDeKm(dekm: string) {
    if (dekm == '') {
      this.veiculoPesquisa.deKm = null;
    } else {
      this.veiculoPesquisa.deKm = dekm;
    }
    //this.buscarVeiculosComFiltro();
    this.buscaAvancadaDeVeiculos();
  }

  filtrarAteKm(ateKm: string) {
    if (ateKm == '') {
      this.veiculoPesquisa.ateKm = null;
    } else {
      this.veiculoPesquisa.ateKm = ateKm;
    }
    //this.buscarVeiculosComFiltro();
    this.buscaAvancadaDeVeiculos();
  }

  /*
  buscarVeiculosComFiltro() {
    this.formarURL();
    this.veiculoService.findVeiculosCustomPage(this.paginator.pageIndex, this.paginator.pageSize, this.veiculoPesquisa).subscribe((response) => {
      this.veiculos.emit(response['content']);
      this.tamanhoLista.emit(response['totalElements']);
      this.vPesquisa.emit(this.veiculoPesquisa);
    }, error => { });
  }
  */

  buscaAvancadaDeVeiculos(){
    this.formarURL();
    this.parametrosDePesquisa.emit(this.veiculoPesquisa);
    console.log(this.veiculoPesquisa)
  }

  formarURL() {
    this.router.navigate(
      ['/estoque'],
      {
        relativeTo: this.route,
        queryParams: this.veiculoPesquisa,
        queryParamsHandling: 'merge'
      });
  }

  limparFiltroMarcaModelo() {
    this.veiculoPesquisa.marca = null;
    this.veiculoPesquisa.modelo = null;
    this.formGroup.value.marca = null;
    this.formGroup.value.modelo = null;
    //this.buscarVeiculosComFiltro();
    this.buscaAvancadaDeVeiculos();
  }

}
