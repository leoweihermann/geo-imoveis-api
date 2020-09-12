import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('properties', table => {
        table.increments('id').primary()
        table.string('image').notNullable()
        table.string('type').notNullable()
        table.string('description').notNullable()
        table.string('city').notNullable()
        table.string('uf', 2).notNullable()
        table.string('neighborhood').notNullable()
        table.string('street').notNullable()
        table.integer('number').notNullable()
        table.integer('bedrooms').notNullable()
        table.integer('bathrooms').notNullable()
        table.integer('garages').notNullable()
        table.decimal('footage').notNullable()
        table.decimal('price').notNullable()
        table.decimal('latitude').notNullable()
        table.decimal('longitude').notNullable()
    })
}


export async function down(knex: Knex) {
    return knex.schema.dropTable('properties')
}
