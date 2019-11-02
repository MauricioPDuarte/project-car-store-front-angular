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
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        public dialog: MatDialog,
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                let errorObj = error;

                if (errorObj.error) {
                    errorObj = errorObj.error;
                }
                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }

                switch (errorObj.status) {
                    case 401:
                        this.handle401();
                        break;

                    case 403:
                        this.handle403();
                        break;
                
                    default:
                        this.handleDefault(errorObj);
                        break;
                }
                return throwError(errorObj);
            }) 
        ) as any;
    }

    handle401() {
        const dialogConfig = new MatDialogConfig();
    
        dialogConfig.data = {
            status: 401,
            title: 'Falha de autenticação',
            message: 'Email ou senha incorretos'
        };

       dialogConfig.width = '320px';

        this.dialog.open(DialogErrorComponent, dialogConfig);
      }

      handle403() {
        const dialogConfig = new MatDialogConfig();
    
        dialogConfig.data = {
            status: 403,
            title: 'Acesso negado',
            message: 'Acesso negado'
        };

        //dialogConfig.width = '320px';

        this.dialog.open(DialogErrorComponent, dialogConfig);
      }


      handleDefault(errorObj){
          const dialogConfig = new MatDialogConfig();

          dialogConfig.data = {
              status: errorObj.status,
              title: errorObj.error,
              message: errorObj.message,
          }

          this.dialog.open(DialogErrorComponent, dialogConfig);
      }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};