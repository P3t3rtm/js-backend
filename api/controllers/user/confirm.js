module.exports = {


  friendlyName: 'Confirm',


  description: 'Confirm user.',


  inputs: {
    token: {
      type: 'string',
      required: true,
      description: "The confirmation token from the email.",
      example: "069697",
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
    },
  },


  exits: {
    success: {
      description: "Email address confirmed and requesting user logged in.",
    },
    invalidOrExpiredToken: {
      statusCode: 400,
      description:
        "The provided token is expired, invalid, or already used up.",
    },
    newToken:{
      statusCode: 401,
      description: "The token was expired, a new one has been sent.",
    }
  },


  fn: async function (inputs, exits) {
    try {
      const newEmailAddress = inputs.email.toLowerCase();
      if (!inputs.token) {
        return exits.invalidOrExpiredToken({
          error: "The provided token is empty.",
        });
      }
      var user = await User.findOne({ email: newEmailAddress });
      if (!user) {
        return exits.invalidOrExpiredToken({
          error: "The provided email doesn't exist.",
        });
      }
      //else
      if (user.emailStatus === "confirmed") {
        return exits.success({
          message: "Your account has already been confirmed",
        });
      }
      if (user.emailProofTokenExpiresAt <= Date.now()) {
        //resend token 
        const cmtoken = await sails.helpers.random();
        await User.update({ id: user.id }).set({
          emailProofToken: cmtoken,
          emailProofTokenExpiresAt:
            Date.now() + sails.config.custom.emailProofTokenTTL,
        });
        const tkString = `${cmtoken}`;
        const confirmLink = tkString.substring(0, 3) + ' ' + tkString.substring(3);
        const emails = {
          to: user.email,
          subject: 'Verify your email address',
          template: 'confirm',
          context: {
            name: user.firstName,
            confirmLink: confirmLink,
          },
        };
        await sails.helpers.sendMail(emails);

        return exits.newToken({
          error: "The provided token is expired. A new token has been sent to your email.",
        });
      }
      if (user.emailStatus === "unconfirmed" && user.emailProofToken == inputs.token) {
        const jwtoken = await sails.helpers.generateNewJwtToken(user.email);
        await User.updateOne({ id: user.id }).set({
          emailStatus: "confirmed",
          emailProofToken: "",
          emailProofTokenExpiresAt: 0,
          jwtToken: jwtoken,
        });
        return exits.success({
          message: "Your account has been confirmed. You have been logged in.",
          data: user,
          jwtToken: jwtoken,
        });
      }
      return exits.invalidOrExpiredToken({
        message: 'the token does not exist',
      });
    } catch (error) {
      return exits.error({
        message: 'Oops :) an errorrrrr occurred',
        error: error.message,
      });
    }


  }


};
