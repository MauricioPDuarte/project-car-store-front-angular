import { StorageService } from './storage.service';
import { LocalUser } from './../models/local_user';
import { API_CONFIG } from 'src/config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    jwtHelperService: JwtHelperService = new JwtHelperService();
    usuarioLogado: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private http: HttpClient,
        private storage: StorageService,
    ) {

    }

    authenticate(creds: CredenciaisDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            creds,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }

    successfulLogin(authorizationValue: string) {
        let tok = authorizationValue.substring(7);
        let user: LocalUser = {
            token: tok,
            email: this.jwtHelperService.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
        this.usuarioLogado.next(true);
    }

    logout() {
        this.storage.setLocalUser(null);
        this.usuarioLogado.next(false);
    }

    refreshToken() {
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`,
            {},
            {
                observe: 'response',
                responseType: 'text'
            }
        )
        
    }

    isUserLoggedIn() {
        return this.usuarioLogado.asObservable();
    }
}