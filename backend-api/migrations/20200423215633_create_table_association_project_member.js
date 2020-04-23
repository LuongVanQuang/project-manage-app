exports.up = function(knex) {
    return knex.schema.createTable('project_members', function(table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned();
        table.integer('project_id').unsigned();
        table.foreign('user_id').references('users.id');
        table.foreign('project_id').references('projects.id');

    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('project_members')
};