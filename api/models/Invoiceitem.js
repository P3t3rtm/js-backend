/**
 * Invoiceitem.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "invoiceitem",

  attributes: {
    invoiceID: {
      type: "number",
      required: true,
      columnName: "invoiceid"
    },
    productID: {
      type: "number",
      required: true,
      columnName: "productid"
    },
    quantity: {
      type: "number",
      required: true,
      columnName: "quantity"
    },
    priceOnOrder: {
      type: "number",
      required: true,
      columnName: "priceonorder"
    },
    taxable: {
      type: "boolean",
      required: true,
      columnName: "taxable"
    },
    discount: {
      type: "number",
      required: true,
      columnName: "discount"
    },
  },

};

