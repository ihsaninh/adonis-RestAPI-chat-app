'use strict'

const Model = use('Model')

class Chat extends Model {
  // static get hidden () {
  //   return ['user_id', 'room_id']
  // }
  user() {
    return this.belongsTo('App/Models/User')
  }
  room() {
    return this.belongsTo('App/Models/Room')
  }
}

module.exports = Chat
