import { Picture } from './picture';
import { ModeloDTO } from './modelo.dto';
import { TipoDTO } from './tipo.dto';
import { CombustivelDTO } from 'src/models/combustivel.dto';
import { CambioDTO } from './cambio.dto';
import { CorDTO } from './cor.dto';
import { AdicionalDTO } from 'src/models/adicional.dto';
import { OpcionalDTO } from './opcional.dto';

export interface Veiculo {
    id: string;
    preco: number;
    ano: number;
    numPortas: number;
    placa: string;
    descricao: string;
    kmRodado: number;
    opcionais: OpcionalDTO[];
    adicionais: AdicionalDTO[];
    cor: CorDTO;
    cambio: CambioDTO;
    combustivel: CombustivelDTO;
    tipo: TipoDTO;
    modelo: ModeloDTO;
    pictures: Picture[];
}