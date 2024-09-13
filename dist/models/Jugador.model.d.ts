import { Model } from "sequelize-typescript";
declare class Jugador extends Model {
    nombreCompleto: string;
    equipo: string;
    numeroDorsal: number;
    posicion: string;
    fechaNacimiento: Date;
}
export default Jugador;
