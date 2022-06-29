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
        try {
            //check if user has inventory privilege
            let user = await User.findOne({ jwtToken: this.req.headers.jwt || 1 });
            if (!user) return exits.invalid();
            //if user has inventory privilege, then return all productions, otherwise, return only unconfirmed productions
            if (user.accessInventory) {
                //find all productions belonging to the last lotNumber
                let productions = await Production.getDatastore().sendNativeQuery(`SELECT * FROM production WHERE production.lotnumber = $1`, [86]);

                // ...grab appropriate data...
                // (result format depends on the SQL query that was passed in, and the adapter you're using)

                // Then parse the raw result and do whatever you like with it.











                //productions = await Production.find({lotNumber: 86}).sort('lotNumber DESC');
                // let productions = await Production.find().sort('lotNumber DESC').limit(10).skip(inputs.page * 10);
                // let productions = await Production.find({}).sort('id DESC').limit(1000);
                return exits.success(productions.rows.map(x => {
                    return {
                        createdAt: x.createdAt,
                        updatedAt: x.updatedAt,
                        id: x.id,
                        productID: x.productid,
                        quantity: x.quantity,
                        lotNumber: x.lotnumber,
                        isConfirmed: x.isconfirmed,
                        confirmID: x.confirmid,
                    }
                }
                ));
            } else {
                let productions = await Production.find({ isConfirmed: 0 }).sort('id DESC');
                return exits.success(productions);
            }
        } catch (error) {
            return exits.invalid({
                error: error.message,
            });
        }

    },


};
