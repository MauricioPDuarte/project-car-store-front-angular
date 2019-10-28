import { VeiculoService } from './../../../services/domain/veiculo.service';
import { VeiculoDTO } from 'src/models/veiculo.dto';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MarcaService } from 'src/services/domain/marca.service';
import { error } from 'util';
import { MarcaDTO } from 'src/models/marca.dto';
import { ModeloDTO } from 'src/models/modelo.dto';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-filtro-veiculos',
  templateUrl: './filtro-veiculos.component.html',
  styleUrls: ['./filtro-veiculos.component.css']
})
export class FiltroVeiculosComponent implements OnInit {

  @Output() veiculos = new EventEmitter<VeiculoDTO[]>();
  marcas: MarcaDTO[];
  modelos: ModeloDTO[];
  formGroup: FormGroup;

  constructor(private marcaService: MarcaService,
     private formBuilder: FormBuilder,
     private veiculoService: VeiculoService) {
    this.formGroup = this.formBuilder.group({
      marca: [null, []],
      modelo: [null, []],
    })
  }

  ngOnInit() {
    this.buscarMarcas();
  }

  buscarMarcas() {
    this.marcaService.findAll().subscribe((response) => {
      this.marcas = response;
    }, error => { });
  }

  buscarModelos() {
    let marca = this.formGroup.value.marca;
    if (marca != null) {
      this.buscarVeiculosPorMarca();
      this.marcaService.findModeloPorMarca(marca.id).subscribe((response) => {
        this.modelos = response;
      }, error => { });
    }
  }

  buscarVeiculosPorMarca() {
    let marca = this.formGroup.value.marca;
    if(marca != null) {
      this.veiculoService.findVeiculoByMarca(marca.nome).subscribe((response) => {
        this.veiculos.emit(response);
      }, error => {});
    }
  }

  buscarVeiculosPorModelo() {
    let modelo = this.formGroup.value.modelo;
    let marca = this.formGroup.value.marca;
    if(modelo != null && marca != null) {
      this.veiculoService.findVeiculoByModelo(marca.nome, modelo.nome).subscribe((response) => {
        this.veiculos.emit(response);
        console.log(marca.nome, modelo.nome);
      }, error => {});
    }
  }
}
