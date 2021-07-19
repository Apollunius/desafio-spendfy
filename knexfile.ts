require('dotenv').config();

export = {
	client: process.env.DB_CLIENT,
    connection: {
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT ?? "5432", 10),
      user: process.env.DB_USERNAME,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "src/migrations",
      extension: "ts",
    },
}
