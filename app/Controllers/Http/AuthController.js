'use strict'

const User = use('App/Models/User')

class AuthController {
  
  async register({ request, auth, response }) {
	    const user = await User.create(request.all())
	    const token = await auth.generate(user)

	    Object.assign(token)

	    return response.json(token)
	  }

	async login({ request, response, auth }) {
	    const { email, password } = request.all()

	    try {
	      if (await auth.attempt(email, password)) {
	        const user = await User.findBy('email', email)
	        const token = await auth.generate(user)

	        Object.assign(token)
	        return response.json(token)
	      }
	    } catch (e) {
	      return response.json({ message: 'You are not registered!' })
	    }
  	}

  	async getuser({response, auth}) {
  		const user = await auth.getUser()
  		return response.send(user)
  	}
}

module.exports = AuthController