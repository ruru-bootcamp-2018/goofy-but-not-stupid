
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('relationships', table =>{
    table.increments('id').primary()
    table.integer('account_id')
    table.integer('id_one')
    table.integer('id_two')
    table.integer('count')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('relationships')
};
