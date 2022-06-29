/**
 * Production.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "production",
  attributes: {
    productID: {
      type: 'number',
      required: true,
      columnName: 'productid'
    },
    quantity: {
      type: 'number',
      required: true,
      columnName: 'quantity'
    },
    lotNumber: {
      type: 'number',
      columnName: 'lotnumber'
    },
  },

};

