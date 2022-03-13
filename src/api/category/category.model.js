const { Model } = require("objection");

const tableNames = require("../../constants/tableNames");
const schema = require("./category.schema.json");

class Category extends Model {
  static get tableName() {
    return tableNames.category;
  }

  static get jsonSchema() {
    return schema;
  }

  static get relationMappings() {
    return {
      category: {
        relation: Model.HasOneRelation,
        modelClass: Category,
        join: {
          from: "category.parent_category_id",
          to: "category.id",
        },
      },
    };
  }
}

module.exports = Category;
