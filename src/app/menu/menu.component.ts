import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  userLogged: Observable<boolean>;

  constructor(
    private auth: AuthService,
    private router: Router,
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
