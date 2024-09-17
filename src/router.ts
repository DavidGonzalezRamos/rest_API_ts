import { Router } from "express"
import { body, param } from "express-validator"
import { createJugador, deleteJugador, getJugador, getJugadorById, updateJugador, updatePosicion } from "./handlers/jugador"
import { handleInputErrors } from "./middleware"

const router = Router()
/**
 * @swagger
 * components: 
 *    schemas:
 *      Jugador:
 *          type: object
 *          properties:
 *            id:
 *                 type: integer
 *                 description: The jugador ID
 *                 example: 1
 * 
 *            nombreCompleto:
 *                 type: string
 *                 description: The jugador name
 *                 example: Angel David Gonzalez Ramos
 * 
 *            Equipo:
 *                 type: string
 *                 description: The jugador equipo
 *                 example: ESCOM
 * 
 *            numeroDorsal:
 *                 type: integer
 *                 description: The jugador dorsal
 *                 example: 23
 * 
 *            posicion:
 *                 type: string
 *                 description: The jugador posicion
 *                 example: Movedor
 * 
 *            fechaNacimiento:
 *                 type: date
 *                 description: The jugador fechaNacimineto
 *                 example: 2002-10-08
 */

/**
 * @swagger
 * /api/jugador: 
 *      get:
 *          summary: Get a list of jugadores
 *          tags:
 *                - Jugadores
 *          descripcion: Return list of Jugadores
 *          responses:
 *               200:
 *                   description: Succesful response
 *                   content:
 *                      application/json:
 *                          schema:
 *                            type: array
 *                            items:
 *                              $ref: '#/components/schemas/Jugador'
 */


//Routing
router.get('/', getJugador)


/**
 * @swagger
 * /api/jugador/{id}:
 *  get: 
 *    summary: Get a jugador by ID
 *    tags:
 *        - Jugadores
 *    description: Return jugador base on its unique ID
 *    parameters: 
 *      - in: path
 *        name: id
 *        description: The ID of the jugador to retrieve
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *        200:
 *             description: Succesful Response
 *             content: 
 *                application/json:
 *                    schema:
 *                        $ref: '#/components/schemas/Jugador' 
 *
 *        404:
 *             description: Not found
 *        400:
 *             description: Bad request
 * 
 */
router.get('/:id', 
  
  param('id').isInt().withMessage('ID no valido, por favor inserta un numero natural') , 
  handleInputErrors,
  getJugadorById

)

/**
 * @swagger
 *  /api/jugador:
 *    post:
 *        summary: Creates a new jugador
 *        tags:
 *            - Jugadores
 *        description: Returns a new record in the database
 *        requestBody:
 *            required: true
 *            content:
 *               application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                         nombreCompleto:
 *                            type: string      
 *                            example: "Angel David Gonzalez Ramos"
 *                         equipo:
 *                            type: string
 *                            example: "ESCOM"
 * 
 *                         numeroDorsal:
 *                            type: integer
 *                            example: 23
 * 
 *                         posicion:
 *                            type: string
 *                            example: "Movedor"
 * 
 *                         fechaNacimiento:
 *                            type: date
 *                            example: 2002-10-08
 * 
 *        responses:
 *            201:
 *              description: Successful response
 *              content:
 *                    application/json:
 *                        schema:
 *                          $ref: '#/components/schemas/Jugador'
 * 
 *            400:
 *              description: Bad Request
 * 
 */

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


/**
 * @swagger
 *  /api/jugador/{id}:
 *    put:
 *        summary: Updates a jugador with user input
 *        tags: 
 *            - Jugadores
 *        description: Rerturns the updated jugador
 *        parameters: 
 *          - in: path
 *            name: id
 *            description: The ID of the jugador to retrieve
 *            required: true
 *            schema:
 *              type: integer
 *        requestBody:
 *            required: true
 *            content:
 *               application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                         nombreCompleto:
 *                            type: string      
 *                            example: "Angel David Gonzalez Ramos"
 *                         equipo:
 *                            type: string
 *                            example: "ESCOM"
 * 
 *                         numeroDorsal:
 *                            type: integer
 *                            example: 13
 * 
 *                         posicion:
 *                            type: string
 *                            example: "Escolta"
 * 
 *                         fechaNacimiento:
 *                            type: date
 *                            example: 2002-10-08 
 * 
 *        responses: 
 *            200:
 *                description: Successful response
 *                content:
 *                    application/json:
 *                        schema:
 *                          $ref: '#/components/schemas/Jugador'
 *            400:
 *                description: Bad request - Invalid ID or Invalid input data
 *            404:
 *                description: Jugador not found
 * 
 * 
 */
router.put('/:id', 
   //Validacion
   param('id').isInt().withMessage('ID no valido, por favor inserta un numero natural') , 
   body('nombreCompleto').notEmpty().withMessage('agregar nombre'),
   body('equipo').notEmpty().withMessage('agregar equipo'),
   body('numeroDorsal')
       .isNumeric().withMessage('valor no valido')
       .notEmpty().withMessage('agregar algo en el dorsal')
       .custom(value => value >= 0).withMessage('numero no valido'),
       body('posicion').notEmpty().withMessage('agregar posicion'),
       body('fechaNacimiento').notEmpty().withMessage('agregar fechaNacimiento'),
       handleInputErrors,
  updateJugador
)

/**
 * @swagger
 *  /api/jugador/{id}:
 *   patch:
 *      summary: Update jugador posicion 
 *      tags:
 *        - Jugadores
 *      description: Returns the updated posicion
 *      parameters: 
 *          - in: path
 *            name: id
 *            description: The ID of the jugador to retrieve
 *            required: true
 *            schema:
 *              type: integer 
 *      requestBody:
 *            required: true
 *            content:
 *               application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                         posicion:
 *                            type: string
 *                            example: "Escolta"
 * 
 *      responses: 
 *            200:
 *                description: Successful response
 *                content:
 *                    application/json:
 *                        schema:
 *                          $ref: '#/components/schemas/Jugador'
 *            400:
 *                description: Bad request - Invalid ID 
 *            404:
 *                description: Jugador not found
 */


router.patch('/:id', 
  param('id').isInt().withMessage('ID no valido, por favor inserta un numero natural') ,   
  handleInputErrors,
  updatePosicion
)


/**
 * @swagger
 *  /api/jugador/{id}:
 *    delete:
 *      summary: Delete jugador by ID
 *      tags:
 *        - Jugadores
 *      description: Delete jugador choose
 *      parameters: 
 *          - in: path
 *            name: id
 *            description: The ID of the jugador to delete
 *            required: true
 *            schema:
 *              type: integer 
 * 
 *      responses: 
 *              200:
 *                description: Successful response
 *                content:
 *                    application/json:
 *                        schema:
 *                          type: string
 *                          value: 'Jugador eliminado'
 *              400:
 *                description: Bad request - Invalid ID 
 *              404:
 *                description: Jugador not found
 * 
 * 
 */
router.delete('/:id', 
  param('id').isInt().withMessage('ID no valido, por favor inserta un numero natural') ,   
  handleInputErrors,  
  deleteJugador
)


export default router