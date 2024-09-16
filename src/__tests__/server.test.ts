/*describe('Primer test', ()=>{
  test('Debe revisar una suma',()=>{
    expect(1+1).toBe(2)
  })
})*/
import request from 'supertest'
import server, {conncectDB} from '../server'
import db from '../config/db'

describe('GET /api', ()=>{
  test('should send back a json response', async ()=>{
    const res = await request(server).get('/api')

  //Si se cumple
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toMatch(/json/)
    expect(res.body.msg).toBe('Desde API')

  //No se debe de cumplir
    expect(res.status).not.toBe(404)
    expect(res.body.msg).not.toBe('desde api')

  })
})

jest.mock('../config/db')

describe('Connect db', ()=>{
  test('should handle database connection error', async ()=>{
    jest.spyOn(db, 'authenticate')
    .mockRejectedValueOnce(new Error('Hubo un error en la conecation de la base de datos'))
    const consoleSpy= jest.spyOn(console, 'log')

    await conncectDB()

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Hubo un error en la conecation de la base de datos')
    )
  })
})