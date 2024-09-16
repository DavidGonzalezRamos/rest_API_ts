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