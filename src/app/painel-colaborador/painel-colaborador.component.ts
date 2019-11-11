import { VeiculoService } from 'src/services/domain/veiculo.service';
import { LocalUser } from './../../models/local_user';
import { StorageService } from './../../services/storage.service';
import { Router } from '@angular/router';
import { ColaboradorService } from './../../services/domain/colaborador.service';
import { ColaboradorDTO } from './../../models/colaborador.dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-painel-colaborador',
  templateUrl: './painel-colaborador.component.html',
  styleUrls: ['./painel-colaborador.component.css']
})
export class PainelColaboradorComponent implements OnInit {

  colaboradores: ColaboradorDTO[];
  usuarioLogado: ColaboradorDTO;
  selecaoMenu: string = 'dashboard';
  

  constructor(
    private colaboradorService: ColaboradorService,
    private router: Router,
    private storage: StorageService,
  ) { 
    
  }

  ngOnInit() {
    this.buscarPorEmail();
    this.buscarColaboradores();
   
  }

  trocarPagina(pagina) {
    this.selecaoMenu = pagina;
  }

  buscarColaboradores() {
    this.colaboradorService.findAll().subscribe((response) => {
      this.colaboradores = response;
      console.log(response);
      console.log(this.colaboradores)
    }, error => {
      if(error.status === 403){
        this.router.navigate(['/colaborador/login'])
      }
    })
  }

  buscarPorEmail() {
    const user = this.storage.getLocalUser();
    if(user) {
      this.colaboradorService.findByEmail(user.email)
      .subscribe((response) => {
        this.usuarioLogado = response;
        console.log(this.usuarioLogado)
      }, error => {
        if(error.status === 403){
          this.router.navigate(['/colaborador/login'])
        }
      });
    }
  }



}
