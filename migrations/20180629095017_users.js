
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', table =>{
    table.increments('id').primary()
    table.integer('account_id')
    table.integer('agility')
    table.string('name')
    table.string('profile_pic')
    table.string('phrase')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
};
