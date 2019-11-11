import { AuthInterceptorProvider } from './../interceptors/auth-interceptor';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { VeiculosComponent } from './veiculos/veiculos.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { FiltroVeiculosComponent } from './veiculos/filtro-veiculos/filtro-veiculos.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgxCurrencyModule } from "ngx-currency";
import { DialogErrorComponent } from './dialog-error/dialog-error.component';
import { ErrorInterceptorProvider } from 'src/interceptors/error-interceptor';
import { LoginComponent } from './login/login.component';
import { MenuAnuncioComponent } from './menu-anuncio/menu-anuncio.component';
import { PainelColaboradorComponent } from './painel-colaborador/painel-colaborador.component';
import { CadastroVeiculoComponent } from './painel-colaborador/cadastro-veiculo/cadastro-veiculo.component';
import { CadastroMenuComponent } from './painel-colaborador/cadastro-menu/cadastro-menu.component';
import { CadastroSucessoComponent } from './painel-colaborador/cadastro-sucesso/cadastro-sucesso.component';
import { ListaMarcasComponent } from './lista-marcas/lista-marcas.component';
import { CadastroMarcaComponent } from './painel-colaborador/cadastro-marca/cadastro-marca.component';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { DashboardComponent } from './painel-colaborador/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    VeiculosComponent,
    FiltroVeiculosComponent,
    DialogErrorComponent,
    LoginComponent,
    MenuAnuncioComponent,
    PainelColaboradorComponent,
    CadastroVeiculoComponent,
    CadastroMenuComponent,
    CadastroSucessoComponent,
    ListaMarcasComponent,
    CadastroMarcaComponent,
    DashboardComponent,

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
    FormsModule,
    SwiperModule,
    
  ],
  providers: [
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogErrorComponent,
    CadastroSucessoComponent,
  ]
})
export class AppModule { }
