const tableNames = require('../../../src/constants/tableNames');
const orderedTableNames = require('../../../src/constants/orderedTableNames');
const {
    addDefaultColumns,
    createNameTable,
    url,
    email,
    references,
} = require('../../../src/lib/tableUtils');

exports.up = async function(knex) {
  await Promise.all([
      knex.schema.createTable(tableNames.billing, (table)=>{
          table.increments().notNullable();
          table.enum('complete', ['Bill Initiated', 'Payment Pending', 'Adding Cart', 'Order Complete']).notNullable().defaultTo("Bill Initiated");
          table.enum('service', ['sell', 'repair', 'purchase']).defaultTo('sell');
          table.enum('payment_method', ['Card', 'Wallet', 'UPI', 'Cash']).defaultTo('Cash');
          references(table, 'user', true);
          references(table, 'customer', true, 'customer');
          references(table, 'customer', true, 'retailer');
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
      })
  ])
};

exports.down = async function(knex) {
    await Promise.all(orderedTableNames.map((tableName) => knex.schema.dropTableIfExists(tableName)));
};
