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

  async create({ request, response, auth }) {
    try {
      const chat = new Chat()
      chat.content = request.input('content')
      chat.room_id = request.input('room_id')
      chat.user_id = auth.user.id
      await chat.save()
      return response.status(201).send(chat)
    } catch (error) {
       return response.status(400).send({
         message: 'Something went wrong!'
       })
    }
  }

  async show({ params, request, response }) {
    try {
      const { id } = params
      const chat = await Chat.query()
        .with('room')
        .with('user')
        .where('id', id)
        .first()
      return response.status(200).send({
        data: chat
      })
    } catch (e) {
      return response.status(404).send({
        message: 'not found'
      })
    }
  }

  async update({ params, request, response }) {
    const { id } = params
    const data = request.all()
    const chat = await Chat.find(id)
    if(chat==null)
      return response.status(404).send({
        message: 'No record found!'
      })
    chat.merge(data)
    await chat.save()
    return response.status(200).send(chat)
  }

  async destroy({ params, request, response }) {
    try {
      const { id } = params
      const chat = await Chat.find(id)
      if(chat==null)
        return response.status(404).send({
          message : 'No record found!'
        })
      await chat.delete()
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

module.exports = ChatController
