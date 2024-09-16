/*describe('Primer test', ()=>{
  test('Debe revisar una suma',()=>{
    expect(1+1).toBe(2)
  })
})*/
import request from 'supertest'
import server from '../server'

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

    console.log(res.status)
  })
})