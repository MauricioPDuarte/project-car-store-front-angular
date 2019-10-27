import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { VeiculosComponent } from './veiculos/veiculos.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { FiltroVeiculosComponent } from './veiculos/filtro-veiculos/filtro-veiculos.component';

@NgModule({
  declarations: [
    AppComponent,
    VeiculosComponent,
    FiltroVeiculosComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
