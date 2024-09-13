import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Jugador from '../models/Jugador.model';
dotenv.config();
// Utiliza import.meta.url para obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const db = new Sequelize(process.env.DATABASE_URL, {
    models: [join(__dirname, '../models/*.ts')],
    logging: false
});
db.addModels([Jugador]);
export default db;
//# sourceMappingURL=db.js.map