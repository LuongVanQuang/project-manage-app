
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id').primary();
        table.string('name');
        table.string('phone').unique();
        table.datetime('birthday');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
