import { Observable, Subject } from 'rxjs';
import { StorageService } from './../services/storage.service';
import { LocalUser } from './../models/local_user';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  userLogged: Observable<boolean>;

  constructor(
    private auth: AuthService,
    private router: Router,
    private storage: StorageService
    ) {
  } 

  ngOnInit(){
    this.userLogged = this.auth.isUserLoggedIn();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/colaborador/login']);
  }
  
}
