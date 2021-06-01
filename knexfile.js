// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host:     '127.0.0.1',
      database: 'gameHouse',
      user:     'root',
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
