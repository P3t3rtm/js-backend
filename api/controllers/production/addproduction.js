module.exports = {


    friendlyName: 'Add',


    description: 'Add production.',


    inputs: {
        logID: {
            type: 'number',
            required: true,
        },
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


            for (let i = 0; i < env.req.body.values.length; i++) {
                if (i == 0) {
                    newProduction = await Production.create({
                        productID: env.req.body.values[i].productID,
                        quantity: env.req.body.values[i].quantity,
                        logID: inputs.logID,
                        comments: inputs.comments,
                        userID: user.id,
                    }).fetch();
                    //update lotNumber with new production id
                    await Production.update({ id: newProduction.id }).set({
                        lotNumber: newProduction.id
                    });

                    const product = await Product.findOne({ id: env.req.body.values[i].productID });
                    //update product quantity with new quantity added on to old
                    await Product.update({ id: env.req.body.values[i].productID }).set({
                        quantity: product.quantity + env.req.body.values[i].quantity,
                    });


                } else {
                    await Production.create({
                        productID: env.req.body.values[i].productID,
                        quantity: env.req.body.values[i].quantity,
                        logID: inputs.logID,
                        comments: inputs.comments,
                        userID: user.id,
                        lotNumber: newProduction.id,
                    });

                    const product = await Product.findOne({ id: env.req.body.values[i].productID });


                    //update product quantity with new quantity added on to old
                    await Product.update({ id: env.req.body.values[i].productID }).set({
                        quantity: product.quantity + env.req.body.values[i].quantity,
                    });

                }

            }
            return exits.success(newProduction.id);

            //update products; add production quantity to product quantity





        } catch (error) {
            return exits.invalid({
                error: error.message,
            });
        }

    },


};
