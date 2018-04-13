exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users_books', (table) => {
      table.increments('id').primary()
      table.integer('user_id').notNullable().unsigned()
      table.integer('book_id').notNullable().unsigned()
      table.enu('status', ['currentlyReading', 'read', 'wantToRead']).notNullable().defaultTo('wantToRead')
      table.foreign('user_id').references('id').inTable('users')
      table.foreign('book_id').references('id').inTable('books')
      table.unique(['user_id', 'book_id'])
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users_books')
  ])
}
