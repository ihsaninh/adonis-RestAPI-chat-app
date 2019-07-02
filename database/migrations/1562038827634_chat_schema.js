'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatSchema extends Schema {
  up () {
    this.create('chats', (table) => {
      table.increments()
      table.text('content').notNullable()
      table
	    .integer('user_id')
	    .unsigned()
	    .references('id')
	    .inTable('users')
	    .onUpdate('NO ACTION')
	    .onDelete('SET NULL');
	   table
	    .integer('room_id')
	    .unsigned()
	    .references('id')
	    .inTable('rooms')
	    .onUpdate('NO ACTION')
	    .onDelete('SET NULL');
      table.timestamps()
    })
  }

  down () {
    this.drop('chats')
  }
}

module.exports = ChatSchema
