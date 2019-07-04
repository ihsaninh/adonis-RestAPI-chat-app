'use strict'

const User = use('App/Models/User')

class UserController {
  
  async index({ response }) {
    try {
      const users = await User.all()
      return response.status(200).send({
        data: users
      })
    } catch (e) {
      return response.status(400).send({
        message: 'bad request'
      })
    }
  }

  async show({ params, response }) {
    try {
      const user = await User.find(params.id)
      return response.status(200).send({
        data: user
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
    const user = await User.find(id)
    if(user==null)
      return response.status(404).send({
        message: 'No record found!'
      })
    user.merge(data)
    await user.save()
    return response.status(200).send(user)
  }

  async destroy({ params, response }) {
    try {
      const { id } = params
      const user = await User.find(id)
      if(user==null)
        return response.status(404).send({
          message : 'No record found!'
        })
      await user.delete()
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

module.exports = UserController
