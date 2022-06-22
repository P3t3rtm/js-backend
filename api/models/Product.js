/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "products",
  attributes: {
    productName: {
      type: 'string',
      required: true,
      columnName: 'productname'
    },
    imageID: {
      type: 'number',
      columnName: 'imageid'
    },
    price: {
      type: 'number',
      columnName: 'price'
    },
    barcode: {
      type: 'number',
      columnName: 'barcode'
    },
    taxable: {
      type: 'boolean',
      columnName: 'taxable'
    },
    quantity: {
      type: 'number',
      columnName: 'quantity'
    },
    category: {
      type: 'string',
      columnName: 'category'
    },
    
  },

};

