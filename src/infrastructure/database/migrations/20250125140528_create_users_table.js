import { randomUUID } from 'crypto';

/**
 * @param {import("knex")} knex
 */
export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.text('id').primary().notNullable().defaultTo(randomUUID());
    table.string('name').notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });
}

/**
 * @param {import("knex")} knex
 */
export async function down(knex) {
  await knex.schema.dropTable('users');
}
