
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('jogos').del()
    .then(function () {
      // Inserts seed entries
      return knex('jogos').insert([
        {nome: 'The Witcher III', genero_id: 1, plataforma: 'PC', preco: 75, foto: 'https://4.bp.blogspot.com/-BcVv7xARbi0/VaJ1J_epXMI/AAAAAAAADZA/KPkjFnyKH1k/s0/15%2B-%2B1.jpg'},
        {nome: 'Fifa 21', genero_id: 3, plataforma: 'Xbox', preco: 120, foto: 'https://i.pinimg.com/originals/e4/41/eb/e441eb941c3fee1cc997e4f345175fb9.jpg'},
        {nome: 'Phasmophobia', genero_id: 5, plataforma: 'PC', preco: 20, foto: 'https://1hitgames.com/wp-content/uploads/2020/11/capa-site-3-scaled.jpg'}
        
      ]);
    });
};
