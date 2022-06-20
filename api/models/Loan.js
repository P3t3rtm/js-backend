/**
 * Loan.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "loans",

  attributes: {

    userID: {
      type: "number",
      required: true,
      columnName: "userid"
    },
    lenderID: {
      type: "number",
      required: true,
      columnName: "lenderid"
    },
    amount: {
      type: "number",
      required: true,
      columnName: "amount"
    },
    imageID: {
      type: "number",
      columnName: "imageid"
    },
    comments: {
      type: "string",
      columnName: "comments"
    },
    date: {
      type: "string",
      required: true,
      columnName: "date"
    },

  },

};

