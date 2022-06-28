module.exports = {


    friendlyName: 'Fetch production',


    description: 'Fetch production.',


    inputs: {
    },


    exits: {
        success: {
            description: 'Production fetched.'
        },
        invalid: {
            statusCode: 400,
            description: 'something fked up',
        },
    },

    fn: async function (inputs, exits) {
        try {//where production.isConfirmed = false

//check if user has inventory privilege
            let user = await User.findOne({ jwtToken: this.req.headers.jwt || 1 });
            if (!user) return exits.invalid();
            //if user has inventory privilege, then return all productions, otherwise, return only unconfirmed productions
            if (user.accessInventory) {
                let productions = await Production.find({}).sort('id DESC');
                return exits.success(productions);
            } else {
                let productions = await Production.find({ isConfirmed: false }).sort('id DESC');
                return exits.success(productions);
            }
        } catch (error) {
            return exits.invalid({
                error: error.message,
            });
        }

    },


};
