
exports.seed = knex => {
  return knex('user').del()
    .then(() => {
      return knex('user').insert([
        { id: 1, username: 'bob', name: 'Bob' },
        { id: 2, username: 'alice', name: 'Alice' }
      ])
    })
    .then(() => {
      return knex('task').del()
        .then(() => {
          return knex('task').insert([
            { id: 1, title: 'title 1', description: 'desc 1', createdByUserId: 1 },
            { id: 2, title: 'title 2', description: 'desc 2', createdByUserId: 1 },
            { id: 3, title: 'title 3', description: 'desc 3', createdByUserId: 1 }
          ])
        })
    })
}
