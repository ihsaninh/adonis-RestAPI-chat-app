"use strict";

const Chat = use("App/Models/Chat");

class ChatController {
  async index({ response }) {
    try {
      const chats = await Chat.query()
        .with("room")
        .with("user")
        .fetch();
      return response.status(200).send({
        data: chats
      });
    } catch (error) {
      console.log(error);
      return response.status(400).send({
        message: "bad request"
      });
    }
  }

  async create({ request, response, view }) {}

  async store({ request, response }) {}

  async show({ params, request, response, view }) {}

  async edit({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = ChatController;
