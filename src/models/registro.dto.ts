import { ItemDTO } from "./item.dto";
import { TipoRegistroDTO } from "./tipo-registro.dto";

export interface RegistroDTO {
    id: string;
    valor: number;
    dataHora: Date;
    /*tipoRegistro: TipoRegistroDTO;
    item: ItemDTO;*/
    tipoRegistroId: number;
    nomeTipoRegistro: string;
    ehRegistroDeSaida: number;
    itemId: number;
    nomeItem: string;
    complemento: string;
    usuarioId: number;
}