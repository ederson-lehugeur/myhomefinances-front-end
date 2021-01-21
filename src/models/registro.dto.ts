export interface RegistroDTO {
    id: string;
    valor: number;
    dataHora: Date;
    tipoRegistroId: number;
    nomeTipoRegistro: string;
    ehRegistroDeSaida: number;
    itemId: number;
    nomeItem: string;
    complemento: string;
    usuarioId: number;
}