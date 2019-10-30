
import { Component, OnInit, Output, ViewChild, Input } from '@angular/core';
import { VeiculoService } from 'src/services/domain/veiculo.service';
import { VeiculoDTO } from 'src/models/veiculo.dto';
import { API_CONFIG } from 'src/config/api.config';
import { MatSort, MatPaginator } from '@angular/material';
import { merge, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.css']
})
export class VeiculosComponent implements OnInit {

  constructor(
    private veiculoService: VeiculoService
    ) { }

  veiculos: VeiculoDTO[];
  tamanhoLista: number;

  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  ngOnInit() {
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
     this.veiculoService.findVeiculosCustomPage(this.paginator.pageIndex, this.paginator.pageSize, 'ASC').subscribe((response) => {
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

  receberTamanhoListaFiltro(tamanhoLista) {
    this.tamanhoLista = tamanhoLista;
  }
}
