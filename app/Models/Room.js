"use strict"

const Model = use("Model")

class Room extends Model {
  chat() {
    return this.hasMany("App/Models/Chat")
  }
}

module.exports = Room
