import { Tipo } from './../enum/tipo';
import { Cor } from './../enum/cor';
import { ModeloDTO } from '../modelo.dto';
import { MarcaDTO } from '../marca.dto';

export class VeiculoPesquisa {
    marca: string;
    modelo: string;
    dePreco: number;
    atePreco: number;
    deAno: number;
    ateAno: number;
    deKm: number;
    ateKm: number;
    cor: string[];
    tipo: string[];
    cambio: string[];
    combustivel: string[];
    adicionais: string[];
    opcionais: string[];
}