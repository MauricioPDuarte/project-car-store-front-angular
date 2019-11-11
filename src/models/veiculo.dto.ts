import { CombustivelDTO } from './combustivel.dto';
import { VersaoDTO } from './versao.dto';
import { OpcionalDTO } from './opcional.dto';
import { CorDTO } from './cor.dto';
import { Tipo } from './enum/tipo';
import { Picture } from './picture';
import { CambioDTO } from './cambio.dto';

export interface VeiculoDTO {
    id: string;
    preco: number;
    ano: number;
    tipo: Tipo;
    combustivel: CombustivelDTO;
    versao: VersaoDTO;
    pictures: Picture[];
    kmRodado: number;
    cambio: CambioDTO;
    opcionais: OpcionalDTO[];
}