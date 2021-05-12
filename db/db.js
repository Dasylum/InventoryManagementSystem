const knexfile = require('./knexfile');

const knex = require('knex')(knexfile.development);

const item_type = [
    { name: 'grocery' },
    { name: 'stationary' },
    { name: 'hardware' }
];

const shape = [
    { name: 'spherical' },
    { name: 'cylindrical' },
    { name: 'conical' },
    { name: 'other' }
]

const inventory_location = [
    { name: 'Cupboard', description: 'Above the stove' },
    { name: 'Fridge', description: 'In the freezer' },
    { name: 'Basement' }
]

const size = [
    { name: 'size1', length: 20, width: 50, height: 30, shape_id: 2, volume: 365.4 },
    { name: 'size2', length: 2, width: 10, height: 40, shape_id: 2, volume: 325.4 },
    { name: 'size3', length: 200, width: 5, height: 20, shape_id: 1, volume: 565.4 },
]

const country = [
    { name: 'Japan', code: 'JAP' },
    { name: 'Australia', code: 'AUS' },
    { name: 'United States', code: 'US' },
    { name: 'India', code: 'IN' }
]

const state = [
    { name: 'Hokkaido', code: 'HOK', country_id: 1 },
    { name: 'New South Wales', code: 'NSW', country_id: 2 },
    { name: 'Queensland', code: 'QSL', country_id: 2 },
    { name: 'California', code: 'CA', country_id: 3 },
    { name: 'Florida', code: 'FL', country_id: 3 },
    { name: 'Rajasthan', code: 'RJ', country_id: 4 },
]

const address = [
    { street_address_1: 'Hello world 1', street_address_2: '2nd Address', city: 'Khairtal', state_id: 4, country_id: 4, zipcode: '301404', longitude: 324.678, latitude: 2224.998 },
    { street_address_1: 'Baker street', street_address_2: 'Jump street', city: 'Kansas', state_id: 4, country_id: 3, zipcode: 'HG445', latitude: 8864.555 },
    { street_address_1: 'Hola amigos', city: 'Melbourne', state_id: 3, country_id: 2, zipcode: 'YED676F' },
]

const company = [
    {}
]

const retailer = [
    {}
]

const checkIfTableIsEmptyOrNot = async (param) => {

    let result;

    await knex(param).select("*").then((item) => {

        if (item === undefined) result = false
        else {
            //console.log("Data exists in the table!!");
            result = true;
        }

    }).catch(err => { console.log(err) })
        .finally(() => { knex.destroy() })

    return result;
}

const writeFunc = async (data, tableName) => {

    if (checkIfTableExists(tableName) == true) {
        if (await checkIfTableIsEmptyOrNot(tableName) === false) {

            knex(tableName).insert(data).then(() => {
                console.log("Record inserted successfully!!");
            })
                .catch(err => { console.log(err) })
                .finally(() => { knex.destroy() })
        }
        else {
            console.log("Table is not empty!!");
        }
    }

    else {
        console.log("Table does not exist!! Creating a new table...");

        knex.schema.createTable(tableName, table => {
            table.increments('id').primary();
            table.string('name');
            table.integer('address').notNullable();
            
            table.foreign('address').references('address');
        }).then(() => {
            console.log("table created successfully!!")
        })
        .catch(err => { console.log(err) })
        .finally(() => { knex.destroy() })
    }

}

const checkIfTableExists = async (param) => {
    let result;

    await knex.schema.hasTable(param).then(table => {
        result = table;
    })
        .catch(err => { console.log(err) })

    return result;
}

/*writeFunc(address, 'address');
writeFunc(company, 'company');
writeFunc(item, 'item');
writeFunc(item_info, 'item_info');
writeFunc(item_image, 'item_image');
writeFunc(related_item, 'related_item');*/

writeFunc('hello', 'retailer');