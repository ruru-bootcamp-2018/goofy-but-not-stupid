
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'Dan', profile_pic: '', phrases: ''},
        {id: 2, name: 'Rebecca D', profile_pic: '', phrases: ''},
        {id: 3, name: 'Riki', profile_pic: '', phrases: ''},
        {id: 4, name: 'Reuben', profile_pic: '', phrases: ''},
        {id: 5, name: 'Brad', profile_pic: '', phrases: ''},
        {id: 6, name: 'Cate', profile_pic: '', phrases: ''},
        {id: 7, name: 'Tay', profile_pic: '', phrases: ''},
        {id: 8, name: 'Rebecca L', profile_pic: '', phrases: ''},
        {id: 9, name: 'Ross', profile_pic: '', phrases: ''},
        {id: 10, name: 'Stan', profile_pic: '', phrases: ''},
        {id: 11, name: 'Anton', profile_pic: '', phrases: ''},
        {id: 12, name: 'Hayden', profile_pic: '', phrases: ''},
        {id: 13, name: 'Kelly', profile_pic: '', phrases: ''},
        {id: 14, name: 'Phoenix', profile_pic: '', phrases: ''},
        {id: 15, name: 'Cliff', profile_pic: '', phrases: ''}
      ]);
    });
};
