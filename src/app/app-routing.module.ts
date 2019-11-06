import { CadastroVeiculoComponent } from './cadastro-veiculo/cadastro-veiculo.component';
import { PainelColaboradorComponent } from './painel-colaborador/painel-colaborador.component';
import { VeiculosComponent } from './veiculos/veiculos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'estoque', component: VeiculosComponent},
  {path: 'colaborador/login', component: LoginComponent},
  {path: 'painel-colaborador', component: PainelColaboradorComponent},
  {path: 'colaborador/cadastrar-veiculo', component: CadastroVeiculoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  

}
