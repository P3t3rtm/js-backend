module.exports = {


    friendlyName: 'Add log',


    description: 'Add log',


    inputs: {
        logAction: {
            type: 'string',
            required: true
        },
    },


    exits: {
        success: {
            description: 'Log added.'
        },
        invalid: {
            statusCode: 400,
            description: 'something fked up',
        },
    },

    fn: async function (inputs, exits, env) {
        //get userid from jwt and submit log
        try {
            const user = await User.findOne({ jwtToken: env.req.headers.jwt || 1 });
            if (!user) return exits.invalid();
            else {
                const log = await Log.create({
                    userID: user.id,
                    logAction: inputs.logAction,
                }).fetch();
                return exits.success(log.id);
            }
        } catch (error) {
            return exits.invalid({ error: error.message });
        }

    },
};
