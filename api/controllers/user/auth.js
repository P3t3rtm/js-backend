module.exports = {


  friendlyName: 'Auth',


  description: 'Auth user.',


  inputs: {
    jwtToken: {
      type: 'string',
      required: true,
    },
  },


  exits: {
    jwtInvalid: {
      statusCode: 403,
      description: 'provided token is invalid',
    },
    success: {
      statusCode: 200,
      description: 'logged in user',
    },
  },


  fn: async function (inputs,exits) {

    try {
      const user = await User.findOne({ jwtToken: inputs.jwtToken });
      if (!user) return exits.jwtInvalid();
      else return exits.success(user.refreshToken);
    } catch (error) {
      return exits.error({
        error: error.message,
      });
    }

  }


};
