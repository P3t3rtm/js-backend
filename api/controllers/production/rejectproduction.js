module.exports = {


    friendlyName: 'Add',


    description: 'Add production.',


    inputs: {
        lotNumber: {
            type: 'number',
            required: true,
        },
    },



    exits: {
        success: {
            description: 'Production lot rejected.'
        },

        invalid: {
            statusCode: 400,
            description: 'something fked up',
        },
        forbidden: {
            statusCode: 403,
            description: 'You are not authorized to reject this production lot.'
        }
    },


// if production is submitted by user with inventory privilege, then set isConfirmed to true and set confirmID to userID
    fn: async function (inputs, exits, env) {
        try {
            const user = await User.findOne({ jwtToken: env.req.headers.jwt || 1 });
            if (!user) return exits.invalid();
            if (!user.accessInventory) return exits.forbidden();
            //set isConfirmed to true for all productions with this lotNumber
            await Production.update({ lotNumber: inputs.lotNumber }).set({
                isConfirmed: 2,
                confirmID: user.id,
            });
            return exits.success();
        } catch (error) {
            return exits.invalid({
                error: error.message,
            });
        }

    },


};
