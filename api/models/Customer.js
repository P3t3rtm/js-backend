/**
 * Customer.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "customers",

  attributes: {

    customerName: {
      type: "string",
      required: true,
      columnName: "customername"
    },
    address: {
      type: "string",
      columnName: "address"
    },
    tin: {
      type: "number",
      columnName: "tin"
    },
    phone: {
      type: "number",
      columnName: "phone"
    },
    

  },

};

