module.exports = {


    friendlyName: 'Fetch production',


    description: 'Fetch production.',


    inputs: {
        lotNumber: {
            type: 'number',
            required: true,
        },
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
            //fetch all productions with lotnumber
            let productions = await Production.find({ lotNumber: inputs.lotNumber });
            return exits.success(productions);
        } catch (error) {
            return exits.invalid({
                error: error.message,
            });
        }

    },


};
