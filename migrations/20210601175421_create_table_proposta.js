
exports.up = (knex) => {
    return knex.schema.createTable("proposta", (table) => {
        table.increments();
        table.string("nome_comprador", 60).notNullable();
        table.decimal("prop", 9.2).notNullable();

        table.integer("jogo_id").notNullable().unsigned();
        table.foreign("jogo_id")
             .references("jogos.id")
             .onDelete("restrict")
             .onUpdate("cascade");

        table.timestamps(true, true);
    })
  
};

exports.down = (knex) => knex.schema.dropTable("proposta");
