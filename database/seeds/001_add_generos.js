
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('genero').del()
    .then(function () {
      // Inserts seed entries
      return knex('genero').insert([
        {nome: 'Aventura'},
        {nome: 'Ação'},
        {nome: 'Esportes'},
        {nome: 'RPG'},
        {nome: 'Terror'}
      ]);
    });
};
