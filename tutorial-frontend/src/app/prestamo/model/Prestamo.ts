import { Game } from "../../game/model/Game";
import { Clients } from "../../clients/model/Clients";

export class Prestamo {
    id: number;
    nameGame: string;
    nameClients: string;
    fechaInicio: Date;
    fechaFin: Date;
}