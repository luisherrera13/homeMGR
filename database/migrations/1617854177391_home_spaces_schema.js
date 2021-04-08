'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HomeSpacesSchema extends Schema {
  up () {
    this.create('home_spaces', (table) => {
      table.increments()
      table.string('spaceName').notNullable()
      table.string('spaceFunction')
      table.timestamps()
    })
  }

  down () {
    this.drop('home_spaces')
  }
}

module.exports = HomeSpacesSchema
