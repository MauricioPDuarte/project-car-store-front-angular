import { StorageService } from './../../services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CredenciaisDTO } from 'src/models/credenciais.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  }

  error: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private storage: StorageService
  ) {

  }

  ngOnInit() {
    this.refreshToken();
  }

  refreshToken() {
    if(this.storage.getLocalUser() != null){
      this.auth.refreshToken()
      .subscribe((response) => {
       this.auth.successfulLogin(response.headers.get("Authorization"));
        this.router.navigate(['/painel-colaborador']);
      }, error => {
        this.auth.usuarioLogado.next(false);
      })
    }
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe((response) => {
       this.auth.successfulLogin(response.headers.get("Authorization"));
        this.router.navigate(['/painel-colaborador']);
      }, error => {
        if(error.status = 401){
          this.error = "Login ou senha incorretos"
        }
      })
  }

}
