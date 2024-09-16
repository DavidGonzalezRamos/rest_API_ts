import request from 'supertest'
import server from '../../server'

describe('POST /api/jugador',()=>{
  test('should display validation errors', async ()=>{
    const response = await request(server).post('/api/jugador').send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(7)

    expect(response.status).not.toBe(401)
    expect(response.body.errors).not.toHaveLength(2)


  })
    test('should create a new jugador', async () =>{
      const response = await request(server).post('/api/jugador').send({
        nombreCompleto: "axel - testing",
        equipo: "ESCOM",
        numeroDorsal: 1,
        posicion: "escolta",
        fechaNacimiento: "2002-10-08"
      })


      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('data')

      expect(response.status).not.toBe(404)
      expect(response.status).not.toBe(200)
      expect(response.body).not.toHaveProperty('errors')

    })
} )

describe('GET /api/jugador', () => {

  test('should check if api/products url exists', async () =>{
    const response = await request(server).get('/api/jugador')
    expect(response.status).not.toBe(404)
  })

  test('GET a JSON response with products', async ()=>{
    const response = await request(server).get('/api/jugador')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveLength(1)
    expect(response.body).not.toHaveProperty('errors')



  })
})

describe('GET /api/jugador/:id', () =>{
  test('Should return a 404 response for a non-existent jugador', async ()=>{
    const jugadorId = 2000
    const response = await request(server).get(`/api/jugador/${jugadorId}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('No existe ese jugador')
  })

  test('Should check a valid ID in the URL', async ()=>{
    const response = await request(server).get('/api/jugador/not-valid-url')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('ID no valido, por favor inserta un numero natural')
  })

  test('Get JSON response for a single product', async ()=>{
    const response = await request(server).get('/api/jugador/1')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
  })
})