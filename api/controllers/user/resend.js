module.exports = {


  friendlyName: 'Resend',


  description: 'Resend verification token to user.',


  inputs: {
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
    },
  },


  exits: {
    success: {
      description: 'resend successful'
    },
    invalid: {
      statusCode: 400,
      description: 'The provided  email address are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request ' +
        'parameters should have been validated/coerced _before_ they were sent.'
    },
    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    },
  },


  fn: async function (inputs, exits) {
    try {
      const newEmailAddress = inputs.email.toLowerCase();
      var user = await User.findOne({ email: inputs.email.toLowerCase() });
      if (!user) {
        return exits.invalid({
          message: "The provided email doesn't exist.",
        });
      }
      if (!user.emailProofToken) {
        return exits.invalid({
          message: `the token was never generated`,
        });
      }
      if (user.emailStatus === "unconfirmed") {
        const tkString = `${user.emailProofToken}`;
        const confirmLink = tkString.substring(0, 3) + ' ' + tkString.substring(3);
        const emails = {
          to: user.email,
          subject: 'Account Verification Code',
          template: 'confirm',
          context: {
            name: user.firstName,
            confirmLink: confirmLink,
          },
        };
        await sails.helpers.sendMail(emails);
        return exits.success({
          message: `The generated token was resent to your email. Check your email to verify`,
        });
      }
      else {
        return exits.emailAlreadyInUse({
          message: 'Oops email already confirmed',
          error: 'This email address is already confirmed',
        });
      }
    } catch (error) {
      return exits.error({
        message: 'Oops :) an errorrrrr occurred',
        error: error.message,
      });
    }
  }


};
