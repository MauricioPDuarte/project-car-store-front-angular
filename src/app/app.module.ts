
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { VeiculosComponent } from './veiculos/veiculos.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { FiltroVeiculosComponent } from './veiculos/filtro-veiculos/filtro-veiculos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgxCurrencyModule } from "ngx-currency";
import { DialogErrorComponent } from './dialog-error/dialog-error.component';
import { ErrorInterceptorProvider } from 'src/interceptors/error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    VeiculosComponent,
    FiltroVeiculosComponent,
    DialogErrorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ScrollingModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxCurrencyModule,
    
  ],
  providers: [
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogErrorComponent]
})
export class AppModule { }
