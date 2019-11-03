import { CorDTO } from './../../models/cor.dto';
import { CorService } from './../../services/domain/cor.service';
import { AdicionalService } from './../../services/domain/adicional.service';
import { AdicionalDTO } from 'src/models/adicional.dto';
import { OpcionalService } from './../../services/domain/opcional.service';
import { OpcionalDTO } from './../../models/opcional.dto';
import { MarcaService } from './../../services/domain/marca.service';
import { ModeloDTO } from 'src/models/modelo.dto';
import { MarcaDTO } from './../../models/marca.dto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ColaboradorService } from './../../services/domain/colaborador.service';
import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { ColaboradorDTO } from 'src/models/colaborador.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-veiculo',
  templateUrl: './cadastro-veiculo.component.html',
  styleUrls: ['./cadastro-veiculo.component.css']
})
export class CadastroVeiculoComponent implements OnInit {

  colaborador: ColaboradorDTO;
  cadastroVeiculo: FormGroup;
  marcas: MarcaDTO[];
  modelos: ModeloDTO[];
  opcionais: OpcionalDTO[];
  adicionais: AdicionalDTO[];
  cores: CorDTO[];


  constructor(
    private storage: StorageService,
    private colaboradorService: ColaboradorService,
    private router: Router,
    private formBuilder: FormBuilder,
    private marcaService: MarcaService,
    private opcionalService: OpcionalService,
    private adicionalService: AdicionalService,
    private corService: CorService,
  ) {
    this.cadastroVeiculo = this.formBuilder.group({
      id: ['', []],
      modeloId: ['', []],
      marcaId: ['', []],
      ano: ['', []],
      preco: ['', []],
      tipoId: ['', []],
      corId: ['', []],
      combustivelId: ['', []],
      cambioId: ['', []],
      numPortas: ['', []],
      placa: ['', []],
      descricao: ['', []],
      kmRodado: ['', []],
      adicionais: [[''], []],
      opcionais: [[''], []]
    });
  }

  ngOnInit() {
    this.carregarColaborador();
    this.carregarMarcas();
    this.carregarOpcionais();
    this.carregarAdicionais();
    this.carregarCores();
  }

  carregarColaborador() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.colaboradorService.findByEmail(localUser.email)
        .subscribe((response) => {
          this.colaborador = response;
        }, error => {
          if (error.status == 403) {
            this.router.navigate(['/colaborador/login']);
          }
        });
    } else {
      this.router.navigate(['/colaborador/login']);
    }
  }

  carregarMarcas() {
    this.marcaService.findAll()
      .subscribe((response) => {
        this.marcas = response;
      }, error => { });
  }

  buscarModelosPorMarca() {
    let marcaId = this.cadastroVeiculo.value.marcaId;
    if (marcaId != null) {
      this.marcaService.findModeloPorMarca(marcaId)
        .subscribe((response) => {
          this.modelos = response;
        }, error => { })
    }
  }

  carregarOpcionais() {
    this.opcionalService.findAll()
      .subscribe((response) => {
        this.opcionais = response;
      }, error => { });
  }

  carregarAdicionais() {
    this.adicionalService.findAll()
      .subscribe((response) => {
        this.adicionais = response;
      }, error => {});
  }

  carregarCores() {
    this.corService.findAll()
      .subscribe((response) => {
        this.cores = response;
      }, error => {});
  }

  teste(){
    console.log(this.cadastroVeiculo.value);
  }

}





