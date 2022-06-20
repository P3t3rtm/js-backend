module.exports = {


  friendlyName: 'Register',


  description: 'Register user.',


  inputs: {
    firstName: {
      type: 'string',
      required: true,
    },
    lastName: {
      type: 'string',
      required: true,
    },
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
      description: 'New user account was created successfully.'
    },

    invalid: {
      statusCode: 400,
      description: 'The provided fullName, password and/or email address are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request ' +
        'parameters should have been validated/coerced _before_ they were sent.'
    },
    emailUnconfirmed: {
      statusCode: 401,
      description: 'Email already in system. Resend verification code.',
    },
    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    },
  },

  fn: async function (inputs, exits) {
    try {
      const newEmailAddress = inputs.email.toLowerCase();
      const token = await sails.helpers.random();
      let newUser = await User.create({
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        email: newEmailAddress,
        password: await sails.helpers.passwords.hashPassword(inputs.password),
        emailProofToken: token,
        emailProofTokenExpiresAt:
          Date.now() + sails.config.custom.emailProofTokenTTL,
      }).fetch();
      const tkString = `${token}`;
      const confirmLink = tkString.substring(0, 3) + ' ' + tkString.substring(3);
      const emails = {
        to: newUser.email,
        subject: 'Verify your email address',
        template: 'confirm',
        context: {
          name: newUser.firstName,
          confirmLink: confirmLink,
        },
      };
      await sails.helpers.sendMail(emails);
      return exits.success({
        message: `An account has been created for ${newUser.email} successfully. Check your email to verify`,
      });
    } catch (error) {
      if (error.code === 'E_UNIQUE') {
        var user = await User.findOne({ email: inputs.email.toLowerCase() });
        if (user.emailStatus === "unconfirmed") {
          return exits.emailUnconfirmed({
            message: "Resend verification code",
            error: 'Resend verification code',
          });
        }
        return exits.emailAlreadyInUse({
          message: 'Oops email already in use',
          error: 'This email address is already in use',
        });
      } 
      return exits.error({
        message: 'Oops :) an errorrrrr occurred',
        error: error.message,
      });
    }
  }


};
