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

    expect(res.status).toBe(200)

    console.log(res.status)
  })
})