
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('accounts').del()
    .then(function () {
      // Inserts seed entries
      return knex('accounts').insert([
        {id: 1, username: 'ruru', hash: '$2b$12$k0NjIsPaR9n41nb725jXuurvSpc731nh5f6S7oIyjym5eKcko6OxO'}
      ]);
    });
};
