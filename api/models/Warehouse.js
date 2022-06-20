/**
 * Warehouse.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "warehousing",
  attributes: {

    lotNumber: {
      type: 'number',
      required: true,
      columnName: 'lotnumber'
    },
    logID: {
      type: 'number',
      required: true,
      columnName: 'logid'
    },
    userID: {
      type: 'number',
      required: true,
      columnName: 'userid'
    },
    comments: {
      type: 'string',
      columnName: 'comments'
    },


  },

};

