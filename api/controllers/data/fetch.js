module.exports = {


  friendlyName: 'Fetch',


  description: 'Fetch data.',


  inputs: {
  },


  exits: {
    invalid: {
      statusCode: 400,
      description: 'something fked up',
    },
    success: {
      statusCode: 200,
      description: 'data sent',
    },
  },


  fn: async function (inputs, exits, env) {

    try {
      const user = await User.findOne({ jwtToken: env.req.headers.jwt || 1 });
      if (!user) return exits.invalid();
      else return exits.success(user);
    } catch (error) {
      return exits.invalid({ error: error.message });
    }

  }


};
