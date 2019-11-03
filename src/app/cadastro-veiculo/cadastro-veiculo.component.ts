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

  constructor(
    private storage: StorageService,
    private colaboradorService: ColaboradorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.carregarColaborador();
    
  }

  carregarColaborador() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.colaboradorService.findByEmail(localUser.email)
      .subscribe((response) => {
        this.colaborador = response;
      }, error => {
        if(error.status == 403){
          this.router.navigate(['/colaborador/login']);
        }
      });
    }else{
      this.router.navigate(['/colaborador/login']);
    }
  }
}

