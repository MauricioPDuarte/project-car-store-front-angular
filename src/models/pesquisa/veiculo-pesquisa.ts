import { Tipo } from './../enum/tipo';
import { Cor } from './../enum/cor';
import { ModeloDTO } from '../modelo.dto';
import { MarcaDTO } from '../marca.dto';

export class VeiculoPesquisa {
    marca: string;
    modelo: string;
    dePreco: string;
    atePreco: string;
    deAno: string;
    ateAno: string;
    deKm: string;
    ateKm: string;
    cor: string[];
    tipo: string[];
    cambio: string[];
    combustivel: string[];
    adicionais: string;
    opcionais: string;
}