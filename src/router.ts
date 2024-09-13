import { Router } from "express"
import { body, param } from "express-validator"
import { createJugador, deleteJugador, getJugador, getJugadorById, updateJugador, updatePosicion } from "./handlers/jugador"
import { handleInputErrors } from "./middleware"

const router = Router()
//Routing
router.get('/', getJugador)
router.get('/:id', 
  
  param('id').isInt().withMessage('ID no valido, por favor inserta un numero natural') , 
  handleInputErrors,
  getJugadorById

)


router.post('/', 
    //Validacion
    body('nombreCompleto').notEmpty().withMessage('agregar algo'),
    body('equipo').notEmpty().withMessage('agregar algo'),
    body('numeroDorsal')
        .isNumeric().withMessage('valor no valido')
        .notEmpty().withMessage('agregar algo')
        .custom(value => value > 0).withMessage('numero no valido'),
        body('posicion').notEmpty().withMessage('agregar algo'),
        body('fechaNacimiento').notEmpty().withMessage('agregar algo'),
        handleInputErrors,
  
  createJugador
    )

router.put('/:id', 
   //Validacion
   param('id').isInt().withMessage('ID no valido, por favor inserta un numero natural') , 
   body('nombreCompleto').notEmpty().withMessage('agregar algo'),
   body('equipo').notEmpty().withMessage('agregar algo'),
   body('numeroDorsal')
       .isNumeric().withMessage('valor no valido')
       .notEmpty().withMessage('agregar algo')
       .custom(value => value > 0).withMessage('numero no valido'),
       body('posicion').notEmpty().withMessage('agregar algo'),
       body('fechaNacimiento').notEmpty().withMessage('agregar algo'),
       handleInputErrors,
  updateJugador
)

router.patch('/:id', 
  param('id').isInt().withMessage('ID no valido, por favor inserta un numero natural') ,   
  handleInputErrors,
  updatePosicion
)

router.delete('/:id', 
  param('id').isInt().withMessage('ID no valido, por favor inserta un numero natural') ,   
  handleInputErrors,  
  deleteJugador
)


export default router