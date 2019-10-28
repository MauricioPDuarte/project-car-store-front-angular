import { Component, OnInit, Output } from '@angular/core';
import { VeiculoService } from 'src/services/domain/veiculo.service';
import { VeiculoDTO } from 'src/models/veiculo.dto';
import { API_CONFIG } from 'src/config/api.config';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.css']
})
export class VeiculosComponent implements OnInit {

  constructor(private veiculoService: VeiculoService) { }

  veiculos: VeiculoDTO[];

  ngOnInit() {
    this.veiculoService.findAll().subscribe((response) => {
      this.veiculos = response;
      this.carregarImagensVeiculo();
    },
    error => {});
  }

  carregarImagensVeiculo() {
    for(let veiculo of this.veiculos) {
      if(veiculo.picture){
        veiculo.picture.fileName = `${API_CONFIG.baseUrl}/veiculos/picture/${veiculo.id}/${veiculo.picture.fileName}`;
      }
    }
  }

  receberVeiculosFiltro(veiculos) {
    this.veiculos = veiculos;
    this.carregarImagensVeiculo();
  }

}
