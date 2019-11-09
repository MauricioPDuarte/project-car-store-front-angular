import { ColaboradorDTO } from './../../models/colaborador.dto';
import { StorageService } from './../../services/storage.service';
import { ColaboradorService } from './../../services/domain/colaborador.service';
import { Router } from '@angular/router';
import { MarcaDTO } from './../../models/marca.dto';
import { MarcaService } from './../../services/domain/marca.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-marcas',
  templateUrl: './lista-marcas.component.html',
  styleUrls: ['./lista-marcas.component.css']
})
export class ListaMarcasComponent implements OnInit {

  marcas: MarcaDTO[];
  isUserAdmin: boolean = false;
  usuarioLogado: ColaboradorDTO;

  constructor(
    private marcaService: MarcaService,
    private router: Router,
    private colaboradorService: ColaboradorService,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    this.carregarMarcas();
    this.verificarMudancas();
    this.verificarUsuarioLogado();
  }

  verificarMudancas(){
    this.marcaService.marcaEvent.subscribe((response) => {
      this.carregarMarcas();
     }, error => {})
  }

  verificarUsuarioLogado() {
    let user = this.storageService.getLocalUser();
    if(user){
      this.colaboradorService.findByEmail(user.email)
        .subscribe((response) => {
          this.usuarioLogado = response;
          this.verificarPerfilUsuario();
        }, error => {})
    }
  }

  verificarPerfilUsuario(){
    if(this.usuarioLogado.perfis.includes('ADMIN')){
      this.isUserAdmin = true;
    }
  }

  deletarMarca(id: string) {
    this.marcaService.deleteMarcaById(id)
      .subscribe((response) => {

      }, error => {  
        if(error.status == 403) {
          this.router.navigate(['/colaborador/login'])
        }
      });
  }

  carregarMarcas() {
    this.marcaService.findAll()
    .subscribe((response) => {
      this.marcas = response;
    }, error => {})
  }

}
