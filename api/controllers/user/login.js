module.exports = {


  friendlyName: 'Login',


  description: 'Login user.',


  inputs: {
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
    },
    password: {
      type: 'string',
      required: true,
      minLength: 8,
    },
  },


  exits: {
    success: {
      statusCode: 200,
      description: "Login successful",
    },
    unconfirmed: {
      statusCode: 405,
      description: "Email unverified",
    },
    notAUser: {
      statusCode: 404,
      description: "User not found",
    },
    passwordMismatch: {
      statusCode: 401,
      description: "Password do not match",
    },
  },


  fn: async function (inputs, exits) {
    try {
      const newEmailAddress = inputs.email.toLowerCase();
      const user = await User.findOne({ email: newEmailAddress });
      if (!user) {
        return exits.notAUser({
          error: `An account belonging to ${newEmailAddress} was not found`,
        });
      }
      await sails.helpers.passwords
        .checkPassword(inputs.password, user.password)
        .intercept('incorrect', () => {
          exits.passwordMismatch();
        });
      if (user.emailStatus === "unconfirmed") {
        return exits.unconfirmed({
          message: "Resend verification code",
          error: 'Resend verification code',
        });
      }
      const token = await sails.helpers.generateNewJwtToken(user.email);
      await User.updateOne({ id: user.id }).set({
        jwtToken: token,
      });
      return exits.success({
        message: `${user.email} has been logged in`,
        jwtToken: token,
      });

    } catch (error) {
      return exits.error({
        message: error.message,
      });
    }

  }


};
