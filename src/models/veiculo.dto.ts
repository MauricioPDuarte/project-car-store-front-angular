import { Tipo } from './enum/tipo';
import { Cor } from './enum/cor';
import { Modelo } from './modelo.dto';
import { Picture } from './picture';

export interface VeiculoDTO {
    id: string;
    preco: number;
    ano: number;
    tipo: Tipo;
    cor: Cor;
    modelo: Modelo;
    picture: Picture;
    kmRodado: number;
}