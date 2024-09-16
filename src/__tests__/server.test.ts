/*describe('Primer test', ()=>{
  test('Debe revisar una suma',()=>{
    expect(1+1).toBe(2)
  })
})*/
import {conncectDB} from '../server'
import db from '../config/db'

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