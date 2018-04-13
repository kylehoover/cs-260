exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('books', (table) => {
      table.increments('id').primary()
      table.string('title').notNullable()
      table.string('author')
      table.string('isbn', 13).notNullable()
      table.integer('pages')
      table.string('img')
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('books')
  ])
}
