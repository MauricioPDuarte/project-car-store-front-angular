import { Marca } from './marca.dto';

export interface Modelo {
    id: string;
    nome: string;
    marca: Marca;
}