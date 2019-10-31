import { ActivatedRoute } from '@angular/router';
import { VeiculoPesquisa } from './../../models/pesquisa/veiculo-pesquisa';

import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { VeiculoService } from 'src/services/domain/veiculo.service';
import { VeiculoDTO } from 'src/models/veiculo.dto';
import { API_CONFIG } from 'src/config/api.config';
import { MatPaginator } from '@angular/material';
import { merge, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.css']
})
export class VeiculosComponent implements OnInit {

  constructor(
    private veiculoService: VeiculoService,
    private route: ActivatedRoute
    ) { }

  veiculos: VeiculoDTO[];
  tamanhoLista: number;
  veiculoPesquisa: VeiculoPesquisa;

  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  ngOnInit() {
    this.veiculoPesquisa = new VeiculoPesquisa();
    this.findAllVeiculosPage();
  }

  ngAfterViewInit(){
    this.paginator.initialized.subscribe(() => this.paginator.pageIndex = 0)

    merge(this.paginator.page).pipe(
      tap(() => {
        this.findAllVeiculosPage();
      })
    ).subscribe();
  }

  findAllVeiculosPage() {
     this.veiculoService.findVeiculosCustomPage(this.paginator.pageIndex, this.paginator.pageSize, 'ASC', this.veiculoPesquisa).subscribe((response) => {
       this.veiculos = response['content'];
       console.log(response);
       this.tamanhoLista = response['totalElements'];
       this.carregarImagensVeiculo();
     })
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

  receberPesquisaVeiculo(veiculoPesquisa) {
    this.veiculoPesquisa = veiculoPesquisa;
  }

  receberTamanhoListaFiltro(tamanhoLista) {
    this.tamanhoLista = tamanhoLista;
  }
}
