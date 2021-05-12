const tableNames = require('../../src/constants/tableNames');
const {
    addDefaultColumns,
    createNameTable,
    url,
    email,
    references,
} = require('../../src/lib/tableUtils');

/**
 * @param {import('knex')} knex
 */
exports.up = async (knex) => {
    await Promise.all([
        knex.schema.createTable(tableNames.user, (table) => {
            table.increments().notNullable();
            email(table, 'email').notNullable().unique();
            table.string('name').notNullable();
            table.string('password', 127).notNullable();
            table.datetime('last_login');
            addDefaultColumns(table);
        }),
        createNameTable(knex, tableNames.item_type),
        createNameTable(knex, tableNames.country),
        createNameTable(knex, tableNames.state),
        createNameTable(knex, tableNames.shape),
        knex.schema.createTable(tableNames.inventory_location, (table) => {
            table.increments().notNullable();
            table.string('name').notNullable().unique();
            table.string('description', 1000);
            url(table, 'image_url');
            addDefaultColumns(table);
        }),
    ]);

    
};

exports.down = async (knex) => {
    await Promise.all(
        [
            
            tableNames.user,
            tableNames.item_type,
            tableNames.country,
            tableNames.state,
            tableNames.shape,
            tableNames.inventory_location,
            
        ].map((tableName) => knex.schema.dropTableIfExists(tableName))
    );
};
