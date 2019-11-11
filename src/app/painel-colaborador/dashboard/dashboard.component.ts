import { VeiculoService } from 'src/services/domain/veiculo.service';
import { ColaboradorService } from './../../../services/domain/colaborador.service';
import { ColaboradorDTO } from './../../../models/colaborador.dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  colaboradores: ColaboradorDTO[];
  totalVeiculosCadastrados: number;

  constructor(
    private colaboradorService: ColaboradorService,
    private veiculoService: VeiculoService,
    
  ) { }

  ngOnInit() {
    this.carregarColaboradores();
    this.buscarTotalDeVeiculosCadastrados();
  }

  carregarColaboradores() {
    this.colaboradorService.findAll()
      .subscribe((response) => {
        this.colaboradores = response;
      }, error => {})
  }

  buscarTotalDeVeiculosCadastrados() {
    this.veiculoService.findAllCarsPage(0, 1, 'ASC')
    .subscribe((response) => {
      this.totalVeiculosCadastrados = response['totalElements'];
    })
  }

}
