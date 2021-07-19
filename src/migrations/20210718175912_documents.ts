import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("documents", table => {
	  table.increments("id")
	  table.text("kbSize");
	  table.text("name").notNullable();
	  table.text("content").notNullable();
	  table.timestamp("createdAt").defaultTo(knex.fn.now())
	  table.timestamp("deletedAt")

  });
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable("documents")

}
