/**
 * Payment.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "payments",

  attributes: {

    amount: {
      type: 'number',
      required: true,
      columnName: 'amount'
    },
    customerID: {
      type: 'number',
      required: true,
      columnName: 'customerid'
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
  },

};

