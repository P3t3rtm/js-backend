module.exports = {


    friendlyName: 'Add',


    description: 'Add production.',


    inputs: {
        productID: {
            type: 'number',
            required: true,
        },
        quantity: {
            type: 'number',
            required: true,
        },
        lotNumber: {
            type: 'number',
        },
        logID: {
            type: 'number',
            required: true,
        },
        userID: {
            type: 'number',
            required: true,
        },
        comments: {
            type: 'string',
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

    fn: async function (inputs, exits) {
        try {
            if (!inputs.lotNumber) {
                let newProduction = await Production.create({
                    productID: inputs.productID,
                    quantity: inputs.quantity,
                    logID: inputs.logID,
                    userID: inputs.userID,
                    comments: inputs.comments,
                }).fetch();
                //update row with id as lot number
                await Production.update({ id: newProduction.id }).set({ lotNumber: newProduction.id });
                return exits.success(newProduction.id);
            }
            else {
                await Production.create({
                    productID: inputs.productID,
                    quantity: inputs.quantity,
                    lotNumber: inputs.lotNumber,
                    logID: inputs.logID,
                    userID: inputs.userID,
                    comments: inputs.comments,
                });
                return exits.success({ message: 'Production submitted.' });
            }
        } catch (error) {
            return exits.invalid({
                error: error.message,
            });
        }

    },


};
