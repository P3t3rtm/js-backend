module.exports = {


    friendlyName: 'Confirm production',


    description: 'Confirm production.',


    inputs: {
        lotNumber: {
            type: 'number',
            required: true,
        },
    },



    exits: {
        success: {
            description: 'Production lot confirmed.'
        },

        invalid: {
            statusCode: 400,
            description: 'something fked up',
        },
        forbidden: {
            statusCode: 403,
            description: 'You are not authorized to confirm this production lot.'
        }
    },


// if production is submitted by user with inventory privilege, then set isConfirmed to true and set confirmID to userID
    fn: async function (inputs, exits, env) {
        try {
            const user = await User.findOne({ jwtToken: env.req.headers.jwt || 1 });
            if (!user) return exits.invalid();
            if (!user.accessInventory) return exits.forbidden();
            //set isConfirmed to true for this lot
            await Lot.update({ id: inputs.lotNumber }).set({ isConfirmed: 1, confirmID: user.id });
            return exits.success();
        } catch (error) {
            return exits.invalid({
                error: error.message,
            });
        }

    },


};
