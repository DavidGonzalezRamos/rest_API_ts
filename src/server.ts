import  express  from "express";
import colors from "colors";
import router from "./router";
import db from "./config/db";

//Connection database
async function conncectDB(){
  try {
    await db.authenticate()
    db.sync()
    //console.log(colors.bgGreen.bold('Conexion exitosa a la BD'))
  } catch (error) {
    //console.log(error)
    console.log(colors.bgRed.white('Hubo un error en la conecation de la base de datos'))
    
  }
}
conncectDB()

//Instancia de Express
const server = express()

//Leer datos de formulario
server.use(express.json())

server.use('/api/jugador', router)

server.get('/api', (req, res)=>{
  res.json({msg: 'Desde API'})
})


export default server