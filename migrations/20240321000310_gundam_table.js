/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('gundams', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('series').notNullable();
        table.string('grade').notNullable();
        table.string('brand').notNullable();
        table.text('description').notNullable();
        table.string('image');
    })
    
    .createTable('user', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('username').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('owned', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('user.id').onUpdate('CASCADE').onDelete('CASCADE');
        table.integer('gundam_id').unsigned().references('gundams.id').onUpdate('CASCADE').onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.boolean('isCompleted').defaultTo(false);
        table.boolean('isInProgress').defaultTo(false);
    })
    .createTable('wishlist', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('user.id').onUpdate('CASCADE').onDelete('CASCADE');
        table.integer('gundam_id').unsigned().references('gundams.id').onUpdate('CASCADE').onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable('wishlist')
    .dropTable('owned')
    .dropTable('user')
    .dropTable('gundams');
};
