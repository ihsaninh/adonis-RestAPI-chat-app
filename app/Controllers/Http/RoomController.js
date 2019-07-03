'use strict'

const Room = use('App/Models/Room')

class RoomController {
  async index({ response }) {
    try {
      const rooms = await Room.query()
        .with('chat.user')
        .fetch()
      return response.status(200).send({
        data: rooms
      })
    } catch (error) {
      return response.status(400).send({
        message: 'bad request'
      })
    }
  }

  async create({ request, response }) {
    try {
      const roomData = request.only(['name'])
      const room = await Room.create(roomData)
      return response.status(201).send(room)
    } catch (error) {
       return response.status(400).send({
         message: 'Something went wrong!'
       })
    }
  }

  async show({ params, response }) {
    try {
      const { id } = params
      const room = await Room.query()
        .with('chat.user')
        .where('id', id)
        .first()
      if (room == null)
        return response.status(404).send({ 
          message: 'No record found!' 
        })
      return response.status(200).send(room)
    } catch (error) {}
  }

  async update({ params, request, response }) {
    const { id } = params
    const data = request.all()
    const room = await Room.find(id)
    if(room==null)
      return response.status(404).send({
        message: 'No record found!'
      })
    room.merge(data)
    await room.save()
    return response.status(200).send(room)
  }

  async destroy({ params, response }) {
    try {
      const { id } = params
      const room = await Room.find(id)
      if(room==null)
        return response.status(404).send({
          message : 'No record found!'
        })
      await room.delete()
      return response.status(200).send({
        message: 'Data deleted'
      })
    } catch (e) {
      return response.status(400).send({
        message: 'Something went wrong!'
      })
    }
  }
}

module.exports = RoomController
