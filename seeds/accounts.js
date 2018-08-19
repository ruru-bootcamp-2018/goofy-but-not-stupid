
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('accounts').del()
    .then(function () {
      // Inserts seed entries
      return knex('accounts').insert([
        {id: 1, username: 'ruru', hash: 'ruru'}
      ]);
    });
};
