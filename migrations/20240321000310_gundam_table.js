/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('gundams', (table)=>{
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('series').notNullable();
        table.string('grade').notNullable();
        table.string('brand').notNullable();
        table.text('description').notNullable();
        table.string('image');
    })
    .createTable('user', (table)=>{
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('username').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
    })
    .createTable('modelStatus', (table)=>{
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('user.id').onUpdate('CASCADE').onDelete('CASCADE')
        table.integer('gundam_id').unsigned().references('gundams.id').onUpdate('CASCADE').onDelete('CASCADE')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('modelStatus').dropTable('user').dropTable('gundams');
};
