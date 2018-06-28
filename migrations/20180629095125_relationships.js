
exports.up = function(knex, Promise) {
  return knex.schema.createTable('relationships', table =>{
    table.integer('id_one')
    table.integer('id_two')
    table.integer('count')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('relationships')
};
