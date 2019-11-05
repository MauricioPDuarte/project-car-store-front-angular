import { VeiculoDTO } from 'src/models/veiculo.dto';
import { TipoService } from './../../services/domain/tipo.service';
import { TipoDTO } from './../../models/tipo.dto';
import { CambioDTO } from './../../models/cambio.dto';
import { CombustivelDTO } from 'src/models/combustivel.dto';
import { CambioService } from './../../services/domain/cambio.service';
import { CombustivelService } from './../../services/domain/combustivel.service';
import { CorDTO } from './../../models/cor.dto';
import { CorService } from './../../services/domain/cor.service';
import { AdicionalService } from './../../services/domain/adicional.service';
import { AdicionalDTO } from 'src/models/adicional.dto';
import { OpcionalService } from './../../services/domain/opcional.service';
import { OpcionalDTO } from './../../models/opcional.dto';
import { MarcaService } from './../../services/domain/marca.service';
import { ModeloDTO } from 'src/models/modelo.dto';
import { MarcaDTO } from './../../models/marca.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColaboradorService } from './../../services/domain/colaborador.service';
import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { ColaboradorDTO } from 'src/models/colaborador.dto';
import { Router } from '@angular/router';
import { VeiculoService } from 'src/services/domain/veiculo.service';

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
  combustiveis: CombustivelDTO[];
  cambios: CambioDTO[];
  tipos: TipoDTO[];

  constructor(
    private storage: StorageService,
    private colaboradorService: ColaboradorService,
    private router: Router,
    private formBuilder: FormBuilder,
    private marcaService: MarcaService,
    private opcionalService: OpcionalService,
    private adicionalService: AdicionalService,
    private corService: CorService,
    private combustivelService: CombustivelService,
    private cambioService: CambioService,
    private tipoService: TipoService,
    private veiculoService: VeiculoService,
  ) {
    this.cadastroVeiculo = this.formBuilder.group({
      id: ['', []],
      modeloId: ['', [Validators.required]],
      marcaId: ['', [Validators.required]],
      ano: ['', [Validators.required, Validators.max(4), Validators.min(4)]],
      preco: ['', [Validators.required]],
      tipoId: ['', [Validators.required]],
      corId: ['', [Validators.required]],
      combustivelId: ['', [Validators.required]],
      cambioId: ['', [Validators.required]],
      numPortas: ['', [Validators.required]],
      placa: ['', [Validators.required]],
      descricao: ['', []],
      kmRodado: ['', [Validators.required]],
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
    this.carregarCombustiveis();
    this.carregarCambios();
    this.carregarTipos();
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

  carregarModelosPorMarca() {
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
      }, error => { });
  }

  carregarCores() {
    this.corService.findAll()
      .subscribe((response) => {
        this.cores = response;
      }, error => { });
  }

  carregarCombustiveis() {
    this.combustivelService.findAll()
      .subscribe((response) => {
        this.combustiveis = response;
      }, error => { })
  }

  carregarCambios() {
    this.cambioService.findAll()
      .subscribe((response) => {
        this.cambios = response;
      }, error => {});
  }

  carregarTipos() {
    this.tipoService.findAll()
      .subscribe((response) => {
        this.tipos = response;
      }, error => {});
  }

  salvar() {
    this.veiculoService.saveCar(this.cadastroVeiculo.value)
      .subscribe((response) => {
        this.cadastroVeiculo.reset;
        var veiculoId = response.headers.get('Location').substring(31);
      }, error => {
        if(error.status == 403){
          this.router.navigate(['/colaborador/login'])
        }
      });
    console.log(this.cadastroVeiculo.value);
  }

}





