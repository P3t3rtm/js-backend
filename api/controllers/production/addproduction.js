module.exports = {


    friendlyName: 'Add',


    description: 'Add production.',


    inputs: {
        comments: {
            type: 'string',
        },
        values: {
            type: [{
                productID: 'number',
                quantity: 'number',
            }]
        },
    },



    exits: {
        success: {
            description: 'Production submitted.'
        },

        invalid: {
            statusCode: 400,
            description: 'something fked up',
        },
    },


    fn: async function (inputs, exits, env) {
        try {
            const user = await User.findOne({ jwtToken: env.req.headers.jwt || 1 });
            if (!user) return exits.invalid();


            let newProduction;
            let newLot;



            //create the log
            let newLog = await Log.create({
                userID: user.id,
                logAction: 'New lot created by ' + user.firstName + ' ' + user.lastName,
            }).fetch();
            if (!newLog) return exits.invalid();


            if (!user.accessInventory) {
                newLot = await Lot.create({
                    userID: user.id,
                    logID: newLog.id,
                    isConfirmed: 0,
                    comments: inputs.comments,
                }).fetch();
            }
            else {
                newLot = await Lot.create({
                    userID: user.id,
                    logID: newLog.id,
                    isConfirmed: 1,
                    confirmID: user.id,
                    comments: inputs.comments,
                }).fetch();
            }

            if (!newLot) return exits.invalid();

            for (let i = 0; i < env.req.body.values.length; i++) {
                newProduction = await Production.create({
                    productID: env.req.body.values[i].productID,
                    quantity: env.req.body.values[i].quantity,
                    lotNumber: newLot.id,
                }).fetch();

                //update product quantity with new quantity added on to old
                const product = await Product.findOne({ id: env.req.body.values[i].productID });
                await Product.update({ id: env.req.body.values[i].productID }).set({
                    quantity: product.quantity + env.req.body.values[i].quantity,
                });

            }
            return exits.success(newLot.id);


        } catch (error) {
            return exits.invalid({
                error: error.message,
            });
        }

    },


};
