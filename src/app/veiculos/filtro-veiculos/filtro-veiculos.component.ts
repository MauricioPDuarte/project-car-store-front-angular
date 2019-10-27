import { VeiculoDTO } from 'src/models/veiculo.dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filtro-veiculos',
  templateUrl: './filtro-veiculos.component.html',
  styleUrls: ['./filtro-veiculos.component.css']
})
export class FiltroVeiculosComponent implements OnInit {

  veiculos : VeiculoDTO[];

  constructor() { }

  ngOnInit() {

  }

  buscarMarcas() {
    
  }

}
