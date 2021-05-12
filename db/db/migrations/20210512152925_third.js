const tableNames = require('../../../src/constants/tableNames');
const {
    addDefaultColumns,
    createNameTable,
    url,
    email,
    references,
} = require('../../../src/lib/tableUtils');

exports.up = async function (knex) {

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

    await knex.schema.createTable(tableNames.address, (table) => {
        table.increments().notNullable();
        table.string('street_address_1', 50).notNullable();
        table.string('street_address_2', 50);
        table.string('city', 50).notNullable();
        table.string('zipcode', 15).notNullable();
        table.double('latitude').notNullable();
        table.double('longitude').notNullable();
        references(table, 'state', false);
        references(table, 'country');
        addDefaultColumns(table);
    });

    await knex.schema.createTable(tableNames.company, (table) => {
        table.increments().notNullable();
        table.string('name').notNullable();
        url(table, 'logo_url');
        table.string('description', 1000);
        url(table, 'website_url');
        // `type` text,
        email(table, 'email');
        references(table, 'address');
        addDefaultColumns(table);
    });

    await knex.schema.createTable(tableNames.size, (table) => {
        table.increments().notNullable();
        table.string('name').notNullable();
        table.double('length').notNullable();
        table.double('width').notNullable();
        table.double('height').notNullable();
        table.double('volume').notNullable();
        references(table, 'shape');
        addDefaultColumns(table);
    });

    await knex.schema.createTable(tableNames.item, (table) => {
        table.increments().notNullable();
        table.string('name').notNullable();
        table.string('description', 1000);
        references(table, 'user');
        references(table, 'item_type');
        references(table, 'company');
        references(table, 'size');
        addDefaultColumns(table);
    });

    await knex.schema.createTable(tableNames.retailer, (table) => {
        table.increments().notNullable();
        table.string('name').notNullable();
        references(table, 'address');
        addDefaultColumns(table);
    })

    await knex.schema.createTable(tableNames.item_info, (table) => {
        table.increments().notNullable();
        table.datetime('purchase_date').notNullable();
        table.datetime('expiration_date').notNullable();
        table.datetime('last_used').notNullable();
        table.double('purchase_price').notNullable();
        table.double('msrp').notNullable();
        references(table, 'user');
        references(table, 'item');
        references(table, 'retailer');
        references(table, 'inventory_location');
        addDefaultColumns(table);
    });

    await knex.schema.createTable(tableNames.related_item, (table) => {
        table.increments().notNullable();
        references(table, 'item');
        references(table, 'related_item')
        addDefaultColumns(table);
    });

    await knex.schema.createTable(tableNames.item_image, (table) => {
        table.increments().notNullable();
        references(table, 'item');
        url(table, 'image_url');
        addDefaultColumns(table);
    })


};

exports.down = async function (knex) {
    await Promise.all([
        tableNames.company,
        tableNames.address,
        tableNames.item,
        tableNames.related_item,
        tableNames.item_image,
        tableNames.item_info,
        tableNames.size,
        tableNames.retailer,
        tableNames.user,
        tableNames.item_type,
        tableNames.country,
        tableNames.state,
        tableNames.shape,
        tableNames.inventory_location,
    ].map((tableName) => knex.schema.dropTableIfExists(tableName))
    );
};
