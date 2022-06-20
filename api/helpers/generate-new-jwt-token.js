const jwt = require("jsonwebtoken");
module.exports = {


  friendlyName: 'Generate new jwt token',


  description: '',


  inputs: {
    subject: {
      type: "string",
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const payload = {
      sub: inputs.subject, // subject
      iss: "JS API" // issuer
    };
    const secret = 'mySecretSanta69410xd';
    const token = jwt.sign(payload, secret, { expiresIn: "1000d" });
    return token;
  }


};

