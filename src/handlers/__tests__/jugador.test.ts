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

  test('should check if api/jugador url exists', async () =>{
    const response = await request(server).get('/api/jugador')
    expect(response.status).not.toBe(404)
  })

  test('GET a JSON response with jugador', async ()=>{
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

  test('Get JSON response for a single jugador', async ()=>{
    const response = await request(server).get('/api/jugador/1')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
  })
})

describe('PUT /api/jugador/:id', () =>{

  test('Should check a valid ID in the URL', async ()=>{
    const response = await request(server)
      .put('/api/jugador/not-valid-url')
      .send({
        "nombreCompleto": "axelPUT - testing",
        "equipo": "ESCOM",
        "numeroDorsal": 3,
        "posicion": "escolta",
        "fechaNacimiento": "2002-11-13"
      })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('ID no valido, por favor inserta un numero natural')
  })

  test('should display validation error messages when updating a jugador', async() => {
    const response = await request(server).put('/api/jugador/1').send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBeTruthy()
    expect(response.body.errors).toHaveLength(7)

    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('data')
  })


  test('should validate numeroDorsal had been update correctly', async() => {
    const response = await request(server)
    .put('/api/jugador/1')
    .send({
      "nombreCompleto": "axelPUT - testing",
      "equipo": "ESCOM",
      "numeroDorsal": -1,
      "posicion": "escolta",
      "fechaNacimiento": "2002-11-13"
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBeTruthy()
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('numero no valido')

    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('data')
  })

  test('should return a 404 response for a non-exist jugador', async() => {
    const jugadorId=2000
    const response = await request(server)
    .put(`/api/jugador/${jugadorId}`)
    .send({
      "nombreCompleto": "axelPUT - testing",
      "equipo": "ESCOM",
      "numeroDorsal": 3,
      "posicion": "escolta",
      "fechaNacimiento": "2002-11-13"
    })
    expect(response.status).toBe(404)
    expect(response.body.error).toBe('No existe ese jugador')

    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('data')
  })

  test('should update an existing jugador', async() => {
    const response = await request(server)
    .put(`/api/jugador/1`)
    .send({
      "nombreCompleto": "axelPUT - testing",
      "equipo": "ESCOM",
      "numeroDorsal": 3,
      "posicion": "escolta",
      "fechaNacimiento": "2002-11-13"
    })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(400)
    expect(response.body).not.toHaveProperty('errors')
  })
})

describe('PATCH /api/jugador/:id', ()=>{
  test('should return a 404 response for a non-existent jugador', async ()=>{
    const jugadorId= 2000
    const response = await request(server).patch(`/api/jugador/${jugadorId}`)
    expect(response.status).toBe(404)
    expect(response.body.error).toBe('No existe ese jugador')
    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('data')
  })

  test('should update posicion jugador', async ()=>{
    const response = await request(server).patch('/api/jugador/1')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
    expect(response.status).not.toBe(400)
    expect(response.body).not.toHaveProperty('error')
  })
})

describe('DELETE /api/jugador/:id', () =>{
  test('should check a valid ID', async ()=>{
    const response = await request(server).delete('/api/jugador/not-valid')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors[0].msg).toBe('ID no valido, por favor inserta un numero natural')
    expect(response.body.errors).toHaveLength(1)
  })

  test('should return a 404 response for a non-existent jugador', async ()=>{
    const jugadorId= 2000
    const response = await request(server).delete(`/api/jugador/${jugadorId}`)
    expect(response.status).toBe(404)
    expect(response.body.error).toBe('No existe ese jugador')
    expect(response.status).not.toBe(200)
  })

  test('should delete jugador', async ()=>{
    const response = await request(server).delete('/api/jugador/1')
    expect(response.status).toBe(200)
    expect(response.body.data).toBe('Jugador borrado')
    expect(response.status).not.toBe(400)
    expect(response.status).not.toBe(404)
  })
})