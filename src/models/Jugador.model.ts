import { Table, Column, Model, DataType} from "sequelize-typescript";

@Table({
  tableName: 'jugador'
})

class Jugador extends Model{
    @Column({
      type: DataType.STRING(100)
    })
    declare nombreCompleto: string

    @Column({
      type: DataType.STRING(100)
    })
    declare equipo: string

    @Column({
      type: DataType.INTEGER
    })
    declare numeroDorsal: number

    @Column({
      type: DataType.STRING(100)
    })
    declare posicion: string
    
    @Column({
      type: DataType.DATE
    })
    declare fechaNacimiento: Date


}
export default Jugador



