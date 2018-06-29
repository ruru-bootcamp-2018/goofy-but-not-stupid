
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'Dan', profile_pic: 'https://avatars2.githubusercontent.com/u/38335330?s=400&v=4', phrases: 'finna git checkout -b'},
        {id: 2, name: 'Rebecca D', profile_pic: 'https://avatars1.githubusercontent.com/u/33082512?s=400&u=dc96828d1a9b2b5ab1fc2b26b11f971c4221b746&v=4', phrases: 'It\'s not RebDUGZ!'},
        {id: 3, name: 'Riki', profile_pic: 'https://avatars0.githubusercontent.com/u/35288360?s=400&v=4', phrases: 'Just send it'},
        {id: 4, name: 'Reuben', profile_pic: 'https://avatars2.githubusercontent.com/u/30964768?s=400&v=4', phrases: 'I\'m in to it'},
        {id: 5, name: 'Brad', profile_pic: 'https://avatars1.githubusercontent.com/u/32467164?s=400&v=4', phrases: 'I live my life a quarter mile at a time'},
        {id: 6, name: 'Cate', profile_pic: 'https://avatars3.githubusercontent.com/u/31713081?s=400&v=4', phrases: 'Plague the great and powerful'},
        {id: 7, name: 'Tay', profile_pic: 'https://avatars2.githubusercontent.com/u/35422306?s=400&v=4', phrases: ''},
        {id: 8, name: 'Rebecca L', profile_pic: 'https://avatars2.githubusercontent.com/u/31602687?s=400&v=4', phrases: ''},
        {id: 9, name: 'Ross', profile_pic: 'https://avatars0.githubusercontent.com/u/36139364?s=400&v=4', phrases: 'Mad dog Ross'},
        {id: 10, name: 'Stan', profile_pic: 'https://avatars2.githubusercontent.com/u/5248248?s=400&v=4', phrases: 'Swamp daddy Stan'},
        {id: 11, name: 'Anton', profile_pic: 'https://avatars1.githubusercontent.com/u/37031684?s=400&v=4', phrases: 'I dunno man'},
        {id: 12, name: 'Hayden', profile_pic: 'https://avatars2.githubusercontent.com/u/36119216?s=400&v=4', phrases: 'Undefined'},
        {id: 13, name: 'Kelly', profile_pic: 'https://avatars2.githubusercontent.com/u/36146657?s=400&v=4', phrases: 'Undefined'},
        {id: 14, name: 'Phoenix', profile_pic: 'https://avatars3.githubusercontent.com/u/36114411?s=400&v=4', phrases: 'Undefined'},
        {id: 15, name: 'Cliff', profile_pic: 'https://avatars1.githubusercontent.com/u/37293617?s=400&v=4', phrases: ''}
      ]);
    });
};
