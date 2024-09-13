import { Request, Response } from "express"
import Jugador from "../models/Jugador.model"

export const getJugador = async (req: Request, res: Response)=>{
try {
  const jugador = await Jugador.findAll({
    order: [
      ['nombreCompleto', 'DESC']
    ],
    attributes: {exclude: ['createdAt', 'updatedAt']}
  })
  res.json({data: jugador})
} catch (error) {
  console.log(error)
}}

export const getJugadorById = async (req: Request, res: Response)=>{
  try {
  const {id} = req.params
  const jugador = await Jugador.findByPk(id)

  if(!jugador){
    return res.status(404).json({
      error: 'No existe ese jugador'
    })
  }

  res.json({data: jugador})
  } catch (error) {
    console.log(error)
  }}
  
export const createJugador = async (req: Request, res: Response) => {

    try {
      const jugador = await Jugador.create(req.body)
      res.json({data: jugador})
    } catch (error) {
      console.log(error)
    }
  
}

export const updateJugador = async (req: Request, res: Response)=>{
  const {id} = req.params
  const jugador = await Jugador.findByPk(id)

  if(!jugador){
    return res.status(404).json({
      error: 'No existe ese jugador'
    })
  }

  //Actualizar
  await jugador.update(req.body)
  await jugador.save()

  res.json({data: jugador})
  }

export const updatePosicion =  async (req: Request, res: Response)=>{
  const {id} = req.params
  const jugador = await Jugador.findByPk(id)

  if(!jugador){
    return res.status(404).json({
      error: 'No existe ese jugador'
    })
  }

  //Actualizar
  jugador.posicion = req.body.posicion
  await jugador.save()

  res.json({data: jugador})
  }


export const deleteJugador = async (req: Request, res: Response)=>{
  const {id} = req.params
  const jugador = await Jugador.findByPk(id)

  if(!jugador){
    return res.status(404).json({
      error: 'No existe ese jugador'
    })
  }

  await jugador.destroy()
  res.json({data: 'Jugador borrado'})
  }