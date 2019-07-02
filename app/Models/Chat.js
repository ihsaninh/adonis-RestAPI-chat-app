'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Chat extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }
  room() {
    return this.belongsTo('App/Models/Room')
  }
}

module.exports = Chat
