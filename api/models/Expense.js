/**
 * Expense.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "expenses",

  attributes: {

    categoryID: {
      type: "number",
      required: true,
      columnName: "categoryid"
    },
    userID: {
      type: "number",
      required: true,
      columnName: "userid"
    },
    logID: {
      type: "number",
      required: true,
      columnName: "logid"
    },
    amount: {
      type: "number",
      required: true,
      columnName: "amount"
    },
    comments: {
      type: "string",
      columnName: "comments"
    },
    imageID: {
      type: "number",
      columnName: "imageid"
    },
    date: {
      type: "string",
      columnName: "date"
    }

  },

};

