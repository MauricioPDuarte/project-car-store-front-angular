import { Tipo } from './enum/tipo';
import { Cor } from './enum/cor';
import { Modelo } from './modelo.dto';

export interface VeiculoDTO {
    id: string;
    preco: number;
    ano: number;
    tipo: Tipo;
    cor: Cor;
    modelo: Modelo;
    picture: string;
    kmRodado: number;
}