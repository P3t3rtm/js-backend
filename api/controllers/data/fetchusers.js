module.exports = {


  friendlyName: 'Fetch users',


  description: 'Fetch users list.',


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
      let users = await User.find();
      return exits.success(users.map(x => {
        return {
          id: x.id,
          firstName: x.firstName,
          lastName: x.lastName,
          colorID: x.colorID,
        }
      }
      ));

    } catch (error) {
      return exits.invalid({
        error: error.message,
      });
    }


  }


};
