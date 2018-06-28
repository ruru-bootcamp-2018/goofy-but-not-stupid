
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table =>{
    table.increments('id')
    table.string('name')
    table.string('profile_pic')
    table.string('phrases')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
