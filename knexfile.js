// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host:     'freedb.tech',
      database: 'freedbtech_gameHouse',
      user:     'freedbtech_crramires',
      password: '1234'
    },
    migration: {
      tableName: 'knex_migrations',
      directory: 'database/migrations'
    },
    seeds: {
      directory: 'database/seeds'
    }
  }
};
