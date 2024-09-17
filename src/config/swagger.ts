import swaggerJSDoc from "swagger-jsdoc";

const options : swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.2',
    tags: [
      {
        name: 'Jugadores',
        description: 'API operations related to Jugadores'
      }
    ],
    info: {
      title: 'REST API Node.js / Express / Typescript',
      version: '1.0.0',
      description: 'API Docs for jugador'
    }
  },
  apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)
export default swaggerSpec