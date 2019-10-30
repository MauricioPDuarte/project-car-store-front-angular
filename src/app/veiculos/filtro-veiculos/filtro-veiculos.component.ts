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
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-filtro-veiculos',
  templateUrl: './filtro-veiculos.component.html',
  styleUrls: ['./filtro-veiculos.component.css']
})
export class FiltroVeiculosComponent implements OnInit {

  @Output() veiculos = new EventEmitter<VeiculoDTO[]>();
  @Output() tamanhoLista = new EventEmitter<number>();
  marcas: MarcaDTO[];
  modelos: ModeloDTO[];
  formGroup: FormGroup;
  @Input() paginator: MatPaginator;
  httpParams : URLSearchParams;
  veiculoPesquisa: VeiculoPesquisa;
  
  constructor(
    private marcaService: MarcaService,
    private formBuilder: FormBuilder,
    private veiculoService: VeiculoService,
    private router: Router,
    private route: ActivatedRoute,
    private redirectService: RedirectService,
    ) {
    this.veiculoPesquisa = new VeiculoPesquisa;
    this.httpParams = new URLSearchParams();
    this.formGroup = this.formBuilder.group({
      marca: [null, []],
      modelo: [null, []],
    })
  }

  ngOnInit() {
    this.veiculoPesquisa = new VeiculoPesquisa;
    this.buscarMarcas();
  }

  //Buscar Marcas/Modelos
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

  buscarVeiculosCustomPage() {
    this.formarURL();
    this.veiculoService.findVeiculosCustomPage(this.paginator.pageIndex, this.paginator.pageSize, 'ASC', this.veiculoPesquisa).subscribe((response) => {
      this.veiculos.emit(response['content']);
      this.tamanhoLista.emit(response['totalElements']);
    }, error => { });
  }

  formarURL() {
    this.router.navigate(
      ['/estoque'], 
      {
        relativeTo: this.route,
        queryParams: this.veiculoPesquisa ,
        queryParamsHandling: 'merge'
      });
  }

}
