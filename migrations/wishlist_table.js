/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema

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
    return knex.schema.table('wishlist', function(table) {
        table.dropColumn('gundam_id');
        table.dropColumn('user_id');
    });
};
