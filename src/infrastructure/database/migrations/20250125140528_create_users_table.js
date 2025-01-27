export async function up(knex) {
    await knex.schema.createTable("users", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("name").notNullable();
        table.string("email").unique().notNullable();
        table.string("password").notNullable();
        table.timestamps(true, true);
    });
}
export async function down(knex) {
    await knex.schema.dropTable("users");
}
