import { StorageService } from './../services/storage.service';
import { DialogErrorComponent } from './../app/dialog-error/dialog-error.component';
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
    HTTP_INTERCEPTORS
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private storage: StorageService,
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let localUser = this.storage.getLocalUser();

        if(localUser) {
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
            return next.handle(authReq);
        }else{
            return next.handle(req);
        }

    }

}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};