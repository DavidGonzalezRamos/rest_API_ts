import  express  from "express";
import colors from "colors";
import cors, {CorsOptions} from "cors";
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from "./config/swagger";
import router from "./router";
import db from "./config/db";

//Connection database
export async function conncectDB(){
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

//Permitr CORS
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if(origin === process.env.FRONTEND_URL){
      callback(null, true)
    }else {
      callback(new Error('No permitido por CORS'))
    }
  }
}
server.use(cors(corsOptions))

//Leer datos de formulario
server.use(express.json())

server.use('/api/jugador', router)

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server