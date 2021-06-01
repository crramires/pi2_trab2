
exports.up = (knex) => {
    return knex.schema.createTable('jogos', (table) => {
        table.increments();
        table.string('nome', 80).notNullable();
        table.string('foto').notNullable();
        table.string('plataforma', 80).notNullable();
        table.decimal('preco', 9.2).notNullable();
        table.boolean('destaque').notNullable().defaultTo('false');
        table.integer('genero_id').notNullable().unsigned();
        table.foreign('genero_id')
             .references("genero.id")
             .onDelete("restrict")
             .onUpdate("cascade")

        //cria os campos created_at e updated_at
        table.timestamps(true, true);

    })
};

exports.down = (knex) => knex.schema.dropTable('jogos');
