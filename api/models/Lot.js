/**
 * Log.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "lot",

  attributes: {
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
    isConfirmed: {
      type: "number",
      columnName: "isconfirmed"
    },
    confirmID: {
      type: "number",
      columnName: "confirmid"
    },
    comments: {
      type: "string",
      columnName: "comments"
    }

  },

};

