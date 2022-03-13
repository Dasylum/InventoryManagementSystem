const tableNames = require("../../../src/constants/tableNames");
const bcrypt = require("bcrypt");

const countries = require("../../../src/constants/countries");
const states = require("../../../src/constants/states");

exports.seed = async function (knex) {
  // Deletes ALL existing entries

  await Promise.all(Object.keys(tableNames).map((table) => knex(table).del()));

  const password = "Admin@1234";

  const users = {
    email: "Dasylum@inventory.com",
    password: await bcrypt.hash(password, 12),
    name: "Deepak",
    isAdmin: true,
  };

  const shapes = [
    {
      name: "Circular",
    },
    {
      name: "Cuboid",
    },
    {
      name: "Round",
    },
    {
      name: "Cylindrical",
    },
    {
      name: "Cube",
    },
  ];

  const item_type = [
    { name: "Hand Drill" },
    { name: "Cutting Blade" },
    { name: "Motor" },
    { name: "Submersible Motor" },
    { name: "Chainsaw" },
    { name: "Nuts" },
    { name: "Bolts" },
    { name: "Washer" },
    { name: "Screw" },
    { name: "ScrewDriver" },
    { name: "Spanner" },
    { name: "Combination Spanner" },
    { name: "Ring Spanner" },
    { name: "Double Open End Spanner" },
  ];

  await knex(tableNames.user).insert(users);
  await knex(tableNames.country).insert(countries);
  await knex(tableNames.state).insert(states);
  await knex(tableNames.shape).insert(shapes);
  await knex(tableNames.category).insert(item_type);

  //To seed the item table we need
  //1. user_id (available)
  const user = await knex.select("id").from(tableNames.user);
  //2. category_id (available)
  const category = await knex.select("id").from(tableNames.category);
  //3. company_id
  //3.1 name
  //3.2 logo_url
  //3.3 description
  //3.4 website_url
  //3.5 email
  //3.6.1 state_id (available)
  const state = await knex.select("id").from(tableNames.state);
  //3.6.2 country_id (available)
  const country = await knex.select("id").from(tableNames.country);
  //3.6.3 street_address_1
  //3.6.4 street_address_2
  //3.6.5 city
  //3.6.6 zipcode
  //3.6.7 latitude
  //3.6.8 longitude
  const addresses = [
    {
      street_address_1: "Jaypee Institute of Information Technology, Sec. 62",
      street_address_2: null,
      city: "Noida",
      zipcode: "201309",
      latitude: 28.62997,
      longitude: 77.37213,
      state_id: state[5].id,
      country_id: country[28].id,
    },
  ];
  await knex(tableNames.address).insert(addresses);
  //3.6 address_id
  const address = await knex.select("id").from(tableNames.address);

  const companies = [
    {
      name: "Bosch",
      logo_url: "https://www.famouslogos.us/images/bosch-logo.jpg",
      description: "Best reliable powertools in the market",
      website_url: "https://www.bosch.com/",
      email: "help@bosch.com",
      address_id: address[0].id,
    },
  ];

  await knex(tableNames.company).insert(companies);

  const company = await knex.select("id").from(tableNames.company);
  //4. size_id
  //4.1 name
  //4.2 length
  //4.3 width
  //4.4 height
  //4.5 radius
  //4.6 volume
  //4.7 shape_id (available)
  const shape = await knex.select("id").from(tableNames.shape);

  const sizes = [
    {
      name: "Small",
      length: 20.3,
      width: 2.5,
      height: 55.7,
      radius: null,
      volume: this.length * this.width * this.height,
      shape_id: shape[0].id,
    },
    {
      name: "Medium",
      length: 30.2,
      width: 5.6,
      height: 23.9,
      radius: null,
      volume: this.length * this.width * this.height,
      shape_id: shape[0].id,
    },
  ];

  await knex(tableNames.size).insert(sizes);

  const size = await knex.select("id").from("size");

  const items = [
    {
      name: "Some item IDK, Let's say A",
      description: "This is the best selling item in this category",
      user_id: user[0].id,
      company_id: company[0].id,
      category_id: category[0].id,
      size_id: size[0].id,
    },
    {
      name: "Some item IDK, Let's say B",
      description: "This is the most recommended tool in this category",
      user_id: user[0].id,
      company_id: company[0].id,
      category_id: category[0].id,
      size_id: size[0].id,
    },
  ];

  await knex(tableNames.item).insert(items);

  //To seed the sub_category table
};
