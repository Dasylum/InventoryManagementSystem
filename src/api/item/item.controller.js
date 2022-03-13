const Item = require("./item.model");

async function getAllItems() {
  try {
    const item = await Item.query().withGraphFetched("category").where({});
    return item;
  } catch (error) {
    return error;
  }
}

async function getItemByCategoryId(id) {
  try {
    const item = await Item.query().where({ category_id: id });
    return item;
  } catch (error) {
    return error;
  }
}

async function getItemById(id) {
  try {
    const item = await Item.query().where({ id: id });
    return item;
  } catch (error) {
    return error;
  }
}

async function newItem(data) {
  try {
    const item = await Item.query().insert(data);
    return item;
  } catch (error) {
    return error;
  }
}

async function updateItemById(id) {
  try {
  } catch (error) {}
}

module.exports = {
  getAllItems,
  getItemById,
  newItem,
  updateItemById,
  getItemByCategoryId,
};
