'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HomeSchema extends Schema {
  up () {
    this.create('homes', (table) => {
      table.increments()
      table.string('home_name').notNullable()
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('homes')
  }
}

module.exports = HomeSchema
