import { VeiculoService } from './../../services/domain/veiculo.service';
import { Component, OnInit } from '@angular/core';
import { VeiculoDTO } from 'src/models/veiculo.dto';

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
    },
    error => {});
  }

}
