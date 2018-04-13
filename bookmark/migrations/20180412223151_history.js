exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('history', (table) => {
      table.increments('id').primary()
      table.enu('type', ['started', 'finished']).notNullable()
      table.date('date').notNullable()
      table.integer('users_books_id').notNullable().unsigned()
      table.foreign('users_books_id').references('id').inTable('users_books')
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('history')
  ])
}
