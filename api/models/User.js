/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "users",
  attributes: {
    firstName: {
      type: 'string',
      required: true,
      columnName: 'firstname'
    },
    lastName:{
      type: 'string',
      required: true,
      columnName: 'lastname'
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
    },
    emailStatus: {
      type: 'string',
      isIn: ['unconfirmed', 'confirmed'],
      defaultsTo: 'unconfirmed',
      columnName: 'email_status'
    },
    emailProofToken: {
      type: 'string',
      description: 'This will be used in the account verification email',
      columnName: 'email_proof_token'
    },
    emailProofTokenExpiresAt: {
      type: 'number',
      description: 'time in milliseconds representing when the emailProofToken will expire',
      columnName: 'email_proof_token_expires_at'
    },
    password: {
      type: 'string',
      required: true
    },
    passwordResetToken: {
      type: 'string',
      description:
        'A unique token used to verify the user\'s identity when recovering a password.',
      columnName: 'password_reset_token',
    },
    passwordResetTokenExpiresAt: {
      type: 'number',
      description:
        'A timestamp representing the moment when this user\'s `passwordResetToken` will expire (or 0 if the user currently has no such token).',
      example: 1508944074211,
      columnName: 'password_reset_token_expires_at',
    },
    jwtToken:{
      type: 'string',
      description: 'JWT token to authenticate a logged in user.',
      columnName: 'jwt_token',
    },
    isAdmin: {
      type: 'boolean',
      defaultsTo: false,
      columnName: 'isadmin'
    },
    isAccountActive: {
      type: 'boolean',
      defaultsTo: true,
      columnName: 'isaccountactive'
    },
    accessProduction: {
      type: 'boolean',
      defaultsTo: false,
      columnName: 'accessproduction'
    },
    accessWarehousing: {
      type: 'boolean',
      defaultsTo: false,
      columnName: 'accesswarehousing'
    },
    accessInvoicing: {
      type: 'boolean',
      defaultsTo: false,
      columnName: 'accessinvoicing'
    },
    accessAccounting: {
      type: 'boolean',
      defaultsTo: false,
      columnName: 'accessaccounting'
    },
    refreshToken: {
      type: 'number',
      columnName: 'refreshtoken'
    },

  },
  customToJSON: function () {
    return _.omit(this, ["password", "jwtToken", "passwordResetToken", "passwordResetTokenExpiresAt", "emailProofToken", "emailProofTokenExpiresAt", "emailStatus", "createdAt","updatedAt"]);
  },
};

