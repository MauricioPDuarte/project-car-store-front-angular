import { OpcionalDTO } from './opcional.dto';
import { CorDTO } from './cor.dto';
import { Tipo } from './enum/tipo';
import { Modelo } from './modelo';
import { Picture } from './picture';
import { CambioDTO } from './cambio.dto';

export interface VeiculoDTO {
    id: string;
    preco: number;
    ano: number;
    tipo: Tipo;
    cor: CorDTO;
    modelo: Modelo;
    pictures: Picture[];
    kmRodado: number;
    cambio: CambioDTO;
    opcionais: OpcionalDTO[];
}