import { Observable, Subject } from 'rxjs';
import { AdicionalService } from './../../../services/domain/adicional.service';
import { AdicionalDTO } from './../../../models/adicional.dto';
import { OpcionalService } from './../../../services/domain/opcional.service';
import { OpcionalDTO } from './../../../models/opcional.dto';
import { VeiculoPesquisa } from './../../../models/pesquisa/veiculo-pesquisa';
import { RedirectService } from './../../../services/redirect.service';
import { MatPaginator } from '@angular/material';
import { VeiculoService } from './../../../services/domain/veiculo.service';
import { VeiculoDTO } from 'src/models/veiculo.dto';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MarcaService } from 'src/services/domain/marca.service';
import { MarcaDTO } from 'src/models/marca.dto';
import { ModeloDTO } from 'src/models/modelo.dto';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DeprecatedI18NPipesModule } from '@angular/common';
import { debounceTime, tap, distinctUntilChanged, last } from 'rxjs/operators';
import { filter } from 'minimatch';


@Component({
  selector: 'app-filtro-veiculos',
  templateUrl: './filtro-veiculos.component.html',
  styleUrls: ['./filtro-veiculos.component.css']
})
export class FiltroVeiculosComponent implements OnInit {

  @Output() veiculos = new EventEmitter<VeiculoDTO[]>();
  @Output() tamanhoLista = new EventEmitter<number>();
  @Output() vPesquisa = new EventEmitter<VeiculoPesquisa>();
  marcas: MarcaDTO[];
  modelos: ModeloDTO[];
  formGroup: FormGroup;
  @Input() paginator: MatPaginator;
  veiculoPesquisa: VeiculoPesquisa;
  opcionais: OpcionalDTO[];
  adicionais: AdicionalDTO[];
  deAno= new Subject<string>();
  ateAno = new Subject<string>();
  deKm= new Subject<string>();
  ateKm = new Subject<string>();

  constructor(
    private marcaService: MarcaService,
    private formBuilder: FormBuilder,
    private veiculoService: VeiculoService,
    private router: Router,
    private route: ActivatedRoute,
    private opcionalService: OpcionalService,
    private adicionalService: AdicionalService
    ) {
    this.veiculoPesquisa = new VeiculoPesquisa;
    this.formGroup = this.formBuilder.group({
      marca: [null, []],
      modelo: [null, []],
      opcionais: [null, []],
      adicionais: [null, []],
      depreco: [null, []],
      atepreco: [null, []],
    })
  }

  ngOnInit() {
    this.veiculoPesquisa = new VeiculoPesquisa;
    this.buscarMarcas();
    this.buscarOpcionais();
    this.buscarAdicionais();
    this.procuraDeAno();
    this.procuraAteAno();
  }

  //Buscar para preencher filtro
  buscarMarcas() {
    this.marcaService.findAll().subscribe((response) => {
      this.marcas = response;
    }, error => { });
  }

  buscarVeiculosEModelosPorMarca() {
    let marca = this.formGroup.value.marca;
    if (marca != null) {
      this.buscarVeiculosPorMarca();
      this.marcaService.findModeloPorMarca(marca.id).subscribe((response) => {
        this.modelos = response;
      }, error => { });
    }
  }

  buscarOpcionais() {
    this.opcionalService.findAll().subscribe((response) => {
      this.opcionais = response;
    }, error => {})
  }

  buscarAdicionais(){
    this.adicionalService.findAll().subscribe((response) => {
      this.adicionais = response;
    }, error => {});
  }

  //Buscar veiculos
  buscarVeiculosPorMarca() {
    this.veiculoPesquisa.marca = this.formGroup.value.marca.nome;
    this.veiculoPesquisa.modelo = null;
    this.buscarVeiculosCustomPage();
  }

  buscarVeiculosPorModelo() {
    this.veiculoPesquisa.modelo = this.formGroup.value.modelo.nome;
    this.buscarVeiculosCustomPage();
  }

  filtrarPorOpcionais() {
    let opcionais =  this.formGroup.value.opcionais;

    let opcionaisString = '';
    for(let opcional of opcionais){
      opcionaisString += `${opcional},`;
    }

    if(opcionaisString == ''){
      opcionaisString = null;
    }

    this.veiculoPesquisa.opcionais = opcionaisString;

    this.buscarVeiculosCustomPage();
  }

  filtrarPorAdicionais() {
    let adicionais = this.formGroup.value.adicionais;
    let adicionaisString = '';
    for(let adicional of adicionais){
      adicionaisString += `${adicional},`;
    }

    if(adicionaisString == ''){
      adicionaisString = null;
    }

    this.veiculoPesquisa.adicionais = adicionaisString;
    this.buscarVeiculosCustomPage();
  }

  filtroPorPrecoDe(depreco: string) {
    if(depreco == '') {
      this.veiculoPesquisa.dePreco = null;
    }else{
      this.veiculoPesquisa.dePreco = depreco; 
    }
    this.buscarVeiculosCustomPage();
  }

  filtroPorPrecoAte(atepreco) {
    if(atepreco == ''){
      this.veiculoPesquisa.atePreco = null;
    }else{
      this.veiculoPesquisa.atePreco = atepreco;
    }
    this.buscarVeiculosCustomPage();
  }

  filtroDeAno(deano: string){
   this.deAno.next(deano);
  }

  procuraDeAno(){
    this.deAno.pipe(
      debounceTime(500),
      distinctUntilChanged()
    
    ).subscribe((res) => {
      if(res.length == 4){
        this.veiculoPesquisa.deAno = res;
        this.buscarVeiculosCustomPage();
      }
      if(res.length < 4 && this.veiculoPesquisa.deAno != null){
        this.veiculoPesquisa.deAno = null;
        this.buscarVeiculosCustomPage();
      }
    })
  }
  
  filtroAteAno(ateano: string){
    this.ateAno.next(ateano);
  }

  procuraAteAno(){
    this.ateAno.pipe(
      debounceTime(500),
      distinctUntilChanged()
    
    ).subscribe((res) => {
      if(res.length == 4){
        this.veiculoPesquisa.ateAno = res;
        this.buscarVeiculosCustomPage();
      }
      if(res.length < 4 && this.veiculoPesquisa.ateAno != null){
        this.veiculoPesquisa.ateAno = null;
        this.buscarVeiculosCustomPage();
      }
    })
  }

  filtroDeKm(dekm: string){
    if(dekm == '') {
      this.veiculoPesquisa.deKm = null;
    }else{
      this.veiculoPesquisa.deKm = dekm; 
    }
    this.buscarVeiculosCustomPage();
  }

  filtroAteKm(ateKm: string){
    if(ateKm == '') {
      this.veiculoPesquisa.ateKm = null;
    }else{
      this.veiculoPesquisa.ateKm = ateKm; 
    }
    this.buscarVeiculosCustomPage();
  }
  
  buscarVeiculosCustomPage() {
    this.formarURL();
    this.veiculoService.findVeiculosCustomPage(this.paginator.pageIndex, this.paginator.pageSize, 'ASC', this.veiculoPesquisa).subscribe((response) => {
      this.veiculos.emit(response['content']);
      this.tamanhoLista.emit(response['totalElements']);
      this.vPesquisa.emit(this.veiculoPesquisa);
    }, error => { });
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

}
