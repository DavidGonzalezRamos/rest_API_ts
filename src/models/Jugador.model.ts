import { Table, Column, Model, DataType} from "sequelize-typescript";

@Table({
  tableName: 'jugador'
})

class Jugador extends Model{
  // @ts-ignore
    @Column({
      type: DataType.STRING(100)
    })
    declare nombreCompleto: string
  // @ts-ignore

    @Column({
      type: DataType.STRING(100)
    })
    declare equipo: string

  // @ts-ignore

    @Column({
      type: DataType.INTEGER
    })
    declare numeroDorsal: number
  // @ts-ignore

    @Column({
      type: DataType.STRING(100)
    })
    declare posicion: string
      // @ts-ignore

    @Column({
      type: DataType.DATE
    })
    declare fechaNacimiento: Date


}
export default Jugador



