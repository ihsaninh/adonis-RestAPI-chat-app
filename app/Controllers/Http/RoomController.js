'use strict'

const Room = use('App/Models/Room')

class RoomController {
  async index({ response }) {
    try {
      const rooms = await Room.query()
        .with('chat')
        .fetch()
      return response.status(200).send({
        data: rooms
      })
    } catch (error) {
      console.log(error)
      return response.status(400).send({
        message: 'bad request'
      })
    }
  }

  async create({ request, response, view }) {
    try {
    } catch (error) {}
  }

  async store({ request, response }) {
    try {
    } catch (error) {}
  }

  async show({ params, response }) {
    try {
      const { id } = params
      const room = await Room.query()
        .with('chat')
        .where('id', id)
        .first()
      if (room == null)
        return response.status(404).send({ message: 'No record found!' })
      return response.status(200).send(room)
    } catch (error) {}
  }

  async edit({ params, request, response, view }) {
    try {
    } catch (error) {}
  }

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = RoomController
