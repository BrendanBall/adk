
exports.up = knex => {
  return knex.schema
    .createTable('user', table => {
      table.increments('id').primary()
      table.string('username')
      table.string('name')
    })
    .createTable('task', table => {
      table.increments('id').primary()
      table.string('title')
      table.string('description')
      table.integer('createdByUserId')
      table.integer('assignedToUserId')

      table.foreign('createdByUserId').references('id').inTable('user')
      table.foreign('assignedToUserId').references('id').inTable('user')
    })
}

exports.down = knex => {
  return knex.schema
    .dropTableIfExists('task')
    .dropTableIfExists('user')
}
