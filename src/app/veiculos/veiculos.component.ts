import { ActivatedRoute } from '@angular/router';
import { VeiculoPesquisa } from './../../models/pesquisa/veiculo-pesquisa';

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { VeiculoService } from 'src/services/domain/veiculo.service';
import { VeiculoDTO } from 'src/models/veiculo.dto';
import { API_CONFIG } from 'src/config/api.config';
import { MatPaginator } from '@angular/material';
import { merge, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.css']
})
export class VeiculosComponent implements OnInit {

  veiculos: VeiculoDTO[];
  tamanhoLista: number;
  veiculoPesquisa: VeiculoPesquisa;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  constructor(
    private veiculoService: VeiculoService,
    private route: ActivatedRoute
  ) {

  }

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false
  };

  ngOnInit() {
    this.veiculoPesquisa = new VeiculoPesquisa();
    this.route.queryParams
      .subscribe((response) => {
        if (response) {
          this.veiculoPesquisa = response as VeiculoPesquisa;
        }
        this.findAllVeiculosPage();
      }, error => { })
  }

  ngAfterViewInit() {
    this.paginator.initialized.subscribe(() => this.paginator.pageIndex = 0)

    merge(this.paginator.page).pipe(
      tap(() => {
        this.findAllVeiculosPage();
      })
    ).subscribe();
  }

  findAllVeiculosPage() {
    this.veiculoService.findVeiculosCustomPage(this.paginator.pageIndex, this.paginator.pageSize, 'ASC', this.veiculoPesquisa)
      .subscribe((response) => {
        this.veiculos = response['content'];
        this.tamanhoLista = response['totalElements'];
        this.carregarImagensVeiculo();
      })
  }

  carregarImagensVeiculo() {
    for (let veiculo of this.veiculos) {
      if (veiculo.pictures.length > 0) {
        for (let picture of veiculo.pictures) {
          if (picture) {
            picture.fileName = `${API_CONFIG.baseUrl}/veiculos/picture/${veiculo.id}/${picture.fileName}`;
          }
        }
      }
    }
  }

  /*
  receberVeiculosFiltro(veiculos) {
    this.veiculos = veiculos;
    this.carregarImagensVeiculo();
  }
  */

  receberPesquisaVeiculo(veiculoPesquisa) {
    this.veiculoPesquisa = veiculoPesquisa;
  }

  receberTamanhoListaFiltro(tamanhoLista) {
    this.tamanhoLista = tamanhoLista;
  }

  receberVeiculoPesquisa(veiculoPesquisa) {
    this.veiculoPesquisa = veiculoPesquisa;
  }
}
