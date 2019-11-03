import { CorDTO } from './cor.dto';
import { Tipo } from './enum/tipo';
import { Modelo } from './modelo';
import { Picture } from './picture';

export interface VeiculoDTO {
    id: string;
    preco: number;
    ano: number;
    tipo: Tipo;
    cor: CorDTO;
    modelo: Modelo;
    picture: Picture;
    kmRodado: number;
}