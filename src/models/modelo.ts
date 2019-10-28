import { MarcaDTO } from './marca.dto';

export interface Modelo {
    id: string;
    nome: string;
    marca: MarcaDTO;
}