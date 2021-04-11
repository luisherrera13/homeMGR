'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemsSchema extends Schema {
  up () {
    this.create('items', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.string('description')
      table.string('image')
      table.string('sound')
      table.string('gpsLocalization')
      table.integer('home_space_id').unsigned().notNullable().references('id').inTable('home_spaces')
      table.string('itemFunction')
      table.string('itemType')
      table.string('price')
      table.string('owner1')
      table.string('owner2')
      table.string('owner3')
      table.string('owner4')
      table.string('owner5')
      table.integer('user_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('items')
  }
}

module.exports = ItemsSchema
