'use strict'

const Chat = use('App/Models/Chat')

class ChatController {
  async index({ response }) {
    try {
      const chats = await Chat.query()
        .with('room')
        .with('user')
        .fetch()
      return response.status(200).send({
        data: chats
      })
    } catch (error) {
      return response.status(400).send({
        message: 'bad request'
      })
    }
  }

  async create({ request, response }) {
    try {
      const chatData = request.only(['content'], ['room_id'])
      const chat = await Chat.create(chatData)
      return response.status(201).send(chat)
    } catch (error) {
       return response.status(400).send({'message':'Something went wrong!'})
    }
  }

  async show({ params, request, response }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = ChatController
