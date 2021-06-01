
exports.up = (knex) => {
  return knex.schema.createTable('genero', (table) => {
      table.increments();
      table.string('nome', 60).notNullable();
  })
};

exports.down = (knex) => knex.schema.dropTable('genero');
