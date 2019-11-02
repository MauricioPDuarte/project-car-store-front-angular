import { PainelColaboradorComponent } from './painel-colaborador/painel-colaborador.component';
import { VeiculosComponent } from './veiculos/veiculos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'estoque', component: VeiculosComponent},
  {path: 'colaborador/login', component: LoginComponent},
  {path: 'painel-colaborador', component: PainelColaboradorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  

}
