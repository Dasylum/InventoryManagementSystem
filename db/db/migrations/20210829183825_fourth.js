const tableNames = require('../../../src/constants/tableNames');
const orderedTableNames = require('../../../src/constants/orderedTableNames');
const {
    addDefaultColumns,
    createNameTable,
    url,
    email,
    references,
} = require('../../../src/lib/tableUtils');
const { ref } = require('objection');

exports.up = async function(knex) {
  await Promise.all([
      knex.schema.createTable(tableNames.billing, (table)=>{
          table.increments().notNullable();
          table.string('name').notNullable();
          table.string('phone');
          table.enum('service', ['sell', 'repair']).defaultTo('sell');
          references(table, 'user', true);
          addDefaultColumns(table);
      }),
      knex.schema.createTable(tableNames.charges, (table) => {
          table.increments().notNullable();
          table.string('name').notNullable();
          table.integer('amount').unsigned().notNullable();
          references(table, 'billing', true);
          addDefaultColumns(table);
      }),
      knex.schema.createTable(tableNames.repair, (table) => {
          table.increments().notNullable();
          table.enum('status', ['fixed', 'waiting for spare parts', 'currently fixing', 'to be started']).defaultTo('to be started');
          references(table, 'billing', true);
          addDefaultColumns(table);
      }),
      knex.schema.createTable(tableNames.cart, (table) => {
          table.increments().notNullable();
          table.integer('quantity').unsigned();
          references(table, 'billing', true);
          references(table, 'item', false);
          addDefaultColumns(table);
      }),
      knex.schema.createTable(tableNames.restock, (table) => {
          table.increments().notNullable();
          table.integer('quantity');
          references(table, 'item', true);
          references(table, 'address', true);
          addDefaultColumns(table);
      })
  ])
};

exports.down = async function(knex) {
    await Promise.all(orderedTableNames.map((tableName) => knex.schema.dropTableIfExists(tableName)));
};