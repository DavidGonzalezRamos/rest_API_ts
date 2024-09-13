var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, DataType } from "sequelize-typescript";
let Jugador = class Jugador extends Model {
};
__decorate([
    Column({
        type: DataType.STRING(100)
    }),
    __metadata("design:type", String)
], Jugador.prototype, "nombreCompleto", void 0);
__decorate([
    Column({
        type: DataType.STRING(100)
    }),
    __metadata("design:type", String)
], Jugador.prototype, "equipo", void 0);
__decorate([
    Column({
        type: DataType.INTEGER
    }),
    __metadata("design:type", Number)
], Jugador.prototype, "numeroDorsal", void 0);
__decorate([
    Column({
        type: DataType.STRING(100)
    }),
    __metadata("design:type", String)
], Jugador.prototype, "posicion", void 0);
__decorate([
    Column({
        type: DataType.DATE
    }),
    __metadata("design:type", Date)
], Jugador.prototype, "fechaNacimiento", void 0);
Jugador = __decorate([
    Table({
        tableName: 'jugador'
    })
], Jugador);
export default Jugador;
//# sourceMappingURL=Jugador.model.js.map