import { ColaboradorDTO } from '../../../models/colaborador.dto';
import { ColaboradorService } from '../../../services/domain/colaborador.service';
import { StorageService } from '../../../services/storage.service';
import { LocalUser } from '../../../models/local_user';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MarcaService } from '../../../services/domain/marca.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cadastro-marca',
  templateUrl: './cadastro-marca.component.html',
  styleUrls: ['./cadastro-marca.component.css']
})
export class CadastroMarcaComponent implements OnInit {

  cadastroMarca: FormGroup;
  usuarioLogado: ColaboradorDTO;

  constructor(
    private marcaService: MarcaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private storage: StorageService,
    private colaboradorService: ColaboradorService,
  ) {
    this.cadastroMarca = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
    })
  }

  ngOnInit() {
    this.buscarColaboradorLogado();
  }

  buscarColaboradorLogado() {
    const user = this.storage.getLocalUser();
    if (user) {
      this.colaboradorService.findByEmail(user.email)
        .subscribe((response) => {
          this.usuarioLogado = response;
          this.verificaPerfilUsuarioLogado();
        }, error => {
          if (error.status === 403) {
            this.router.navigate(['/colaborador/login'])
          }
        });
    }else{
      this.router.navigate(['/colaborador/login'])
    }

  }

  verificaPerfilUsuarioLogado() {
    if (!this.usuarioLogado.perfis.includes('ADMIN')) {
      this.router.navigate(['/painel-colaborador']);
      console.log('AQUI')
    }
  }

  salvar() {
    this.marcaService.save(this.cadastroMarca.value)
      .subscribe((response) => {
        this.cadastroMarca.reset();
      }, error => {
        if (error.status == 403) {
          this.router.navigate(['/colaborador/login']);
        }
      })
  }
}
