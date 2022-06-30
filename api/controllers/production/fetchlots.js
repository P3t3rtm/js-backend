module.exports = {


    friendlyName: 'Fetch lot',


    description: 'Fetch lots.',


    inputs: {
        lastLot: {
            type: 'number',
        },
    },


    exits: {
        success: {
            description: 'Lot fetched.'
        },
        invalid: {
            statusCode: 400,
            description: 'something fked up',
        },
    },

    fn: async function (inputs, exits) {
        try {
            //check if user has inventory privilege
            let user = await User.findOne({ jwtToken: this.req.headers.jwt || 1 });
            let lots;
            if (!user) return exits.invalid();
            //if user has inventory privilege, then return all productions, otherwise, return only unconfirmed productions
            if (user.accessInventory) {
                if (!inputs.lastLot) {
                    lots = await Lot.find({}).sort('id DESC').limit(20);
                }
                else {
                    lots = await Lot.find({ id: { '<': inputs.lastLot } }).sort('id DESC').limit(20);
                }
                return exits.success(lots);
            } else {
                if (!inputs.lastLot) {
                    lots = await Lot.find({ isConfirmed: 0 }).sort('id DESC').limit(20);
                }
                else {
                    lots = await Lot.find({ id: { '<': inputs.lastLot }, isConfirmed: 0 }).sort('id DESC').limit(20);
                }
                return exits.success(lots);


            }
        } catch (error) {
            return exits.invalid({
                error: error.message,
            });
        }

    },


};
