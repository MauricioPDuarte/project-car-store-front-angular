export interface VeiculoNewDTO {
    id: number;
    preco: number;
    ano: number;
    tipoId: number;
    corId: number;
    combustivelId: number;
    cambioId: number;
    numPortas: number;
    versaoId: number;
    placa: string;
    descricao: string;
    kmRodado: number;
    opcionais: number[];
    adicionais: number[];
}