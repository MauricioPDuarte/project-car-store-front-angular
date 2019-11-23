import { Tipo } from './../enum/tipo';
import { Cor } from './../enum/cor';
import { ModeloDTO } from '../modelo.dto';
import { MarcaDTO } from '../marca.dto';

export interface VeiculoPesquisa {
    marca: string;
    modelo: string;
    versao: string;
    dePreco: string;
    atePreco: string;
    deAno: string;
    ateAno: string;
    deKm: string;
    ateKm: string;
    cores: string;
    tipos: string;
    cambios: string;
    combustiveis: string;
    adicionais: string;
    opcionais: string;
    direction: string;
    orderBy: string;
}