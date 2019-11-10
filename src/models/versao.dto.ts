import { ModeloDTO } from './modelo.dto';
export interface VersaoDTO {
    id: string;
    nome: string;
    modelo: ModeloDTO;
}