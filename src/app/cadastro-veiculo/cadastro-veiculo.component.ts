import { API_CONFIG } from 'src/config/api.config';
import { Picture } from './../../models/picture';
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
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CadastroSucessoComponent } from '../cadastro-sucesso/cadastro-sucesso.component';

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
  urls = [];
  picturesFiles: any = [];
  fotosSalvasComSucesso: Picture[];
  pictureIndexThumb: number;

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
    public dialog: MatDialog,
  ) {
    this.cadastroVeiculo = this.formBuilder.group({
      id: ['', []],
      modeloId: ['2', [Validators.required]],
      marcaId: ['1', [Validators.required]],
      ano: ['2029', [Validators.required, Validators.max(4), Validators.min(4)]],
      preco: ['30000', [Validators.required]],
      tipoId: ['2', [Validators.required]],
      corId: ['2', [Validators.required]],
      combustivelId: ['2', [Validators.required]],
      cambioId: ['2', [Validators.required]],
      numPortas: ['2', [Validators.required]],
      placa: ['HUY-2323', [Validators.required]],
      descricao: ['sdasdasda', []],
      kmRodado: ['232323', [Validators.required]],
      adicionais: [[1,2,3,4], []],
      opcionais: [[1,2,3,4], []]
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
      }, error => { });
  }

  carregarTipos() {
    this.tipoService.findAll()
      .subscribe((response) => {
        this.tipos = response;
      }, error => { });
  }

  carregarArquivos(event) {
    console.log(event);
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        this.picturesFiles.push(event.target.files[i]);
        reader.onload = (event: any) => {
          this.urls.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  gerarFormDataPictures(){
    const filePhotos = new FormData();
    if (this.picturesFiles != null) {
      for (let file of this.picturesFiles) {
        filePhotos.append('file', file);
      }
    }
    return filePhotos;
  }

  tornarThumbnail(value) {
    this.pictureIndexThumb = value;
    console.log(value);
  }

  salvarFotosVeiculo(veiculoId: string){
    const file: FormData = this.gerarFormDataPictures()

    if(file != null){
      this.veiculoService.savePicturesVehicle(veiculoId, file)
        .subscribe((response) => {
          this.fotosSalvasComSucesso = response;
          this.tornarFotoPrincipal(veiculoId);
        }, error => {})
    }
  }

  tornarFotoPrincipal(veiculoId) {
    for(let i = 0; i <= this.fotosSalvasComSucesso.length; i++){
      if(i == this.pictureIndexThumb){
        this.veiculoService.turnPictureThumb(veiculoId, this.fotosSalvasComSucesso[i].id)
        .subscribe((response) => {
          console.log("foi")
        }, error => {});
      }
    }
  }

  salvar() {
    const file: FormData = this.gerarFormDataPictures();

    this.veiculoService.saveCar(this.cadastroVeiculo.value)
      .subscribe((response) => {
        this.cadastroVeiculo.reset;
        var veiculoId = response.headers.get('Location').substring(31);
        this.salvarFotosVeiculo(veiculoId);
        this.abrirDialogoSucesso(veiculoId);
      }, error => {
        if (error.status == 403) {
          this.router.navigate(['/colaborador/login'])
        }
      });
    console.log(this.cadastroVeiculo.value);
  }

  abrirDialogoSucesso(veiculoId){
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.data = {
        title: 'Sucesso!',
        message: 'Veículo cadastrado com sucesso...',
        linkAnuncio: veiculoId
    };

   dialogConfig.width = '525px';
   dialogConfig.height = '350px';

    this.dialog.open(CadastroSucessoComponent, dialogConfig);
  }

}





