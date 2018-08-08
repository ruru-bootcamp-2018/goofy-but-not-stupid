
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('groups', table => {
        table.increments('id').primary()
        table.integer('account_id')
        table.string('people')
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('groups')
  };
  