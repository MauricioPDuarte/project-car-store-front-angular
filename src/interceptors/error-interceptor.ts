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
import { FieldMessage } from 'src/models/field-message';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        public dialog: MatDialog,
        private storage: StorageService
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

                    case 422:
                        this.handle422(errorObj);
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

      handle422(errorObj) {
        const dialogConfig = new MatDialogConfig();
    
        dialogConfig.data = {
            status: 422,
            title: 'Erro de validação',
            message: this.listErrors(errorObj.errors)
        };

       

        this.dialog.open(DialogErrorComponent, dialogConfig);
      }

      handle403() {
        this.storage.setLocalUser(null);
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

      listErrors(messages: FieldMessage[]): string {
        let s: string = '';
        for (var i = 0; i < messages.length; i++) {
            s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>'
        }
        return "<div id='myDiv'>" + s + " </div>" 
    }
}



export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};