import { StorageService } from './storage.service';
import { LocalUser } from './../models/local_user';
import { API_CONFIG } from 'src/config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { JwtHelperService  } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    jwtHelperService: JwtHelperService  = new JwtHelperService ();

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
        let user : LocalUser = {
            token: tok,
            email:  this.jwtHelperService.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
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
}