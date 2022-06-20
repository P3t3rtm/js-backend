/**
 * Invoice.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "invoicing",

  attributes: {

    customerID  : {
      type: "number",
      required: true,
      columnName: "customerid"

    },
    userID : {
      type: 'number',
      required: true,
      columnName: 'userid'
    },
    logID: {
      type: 'number',
      required: true,
      columnName: 'logid'
    },
    discount: {
      type: 'number',
      required: true,
      columnName: 'discount'
    },
    comments: {
      type: 'string',
      columnName: 'comments'
    },
    date: {
      type: 'string',
      columnName: 'date'
    },


  },

};

