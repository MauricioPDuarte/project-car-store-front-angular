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
  ) {

  }

  ngOnInit() {
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe((response) => {
        console.log(response.headers.get("Authorization"))
        this.router.navigate(['/estoque']);
      }, error => {
        this.error = "Login ou senha incorretos"
      })
  }

}
