"use strict";

const User = use("App/Models/User");

class UserController {
  async register({ request, auth, response }) {
    let user = await User.create(request.all());
    let token = await auth.generate(user);

    Object.assign(user, token);

    return response.json(user);
  }

  async login({ request, response, auth }) {
    let { email, password } = request.all();

    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy("email", email);
        let token = await auth.generate(user);

        Object.assign(user, token);
        return response.json(user);
      }
    } catch (e) {
      return response.json({ message: "You are not registered!" });
    }
  }

  async index({ response }) {
    try {
      const users = await User.all();
      return response.status(200).send({
        data: users
      });
    } catch (e) {
      return response.status(400).send({
        message: "bad request"
      });
    }
  }

  async show({ params, response }) {
    try {
      const user = await User.find(params.id);
      return response.status(200).send({
        data: user
      });
    } catch (e) {
      return response.status(404).send({
        message: "not found"
      });
    }
  }
}

module.exports = UserController;
