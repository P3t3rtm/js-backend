/**
 * Log.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "logs",

  attributes: {
    userID: {
      type: "number",
      required: true,
      columnName: "userid"
    },
    details: {
      type: "string",
      required: true,
      columnName: "details"
    },

  },

};

