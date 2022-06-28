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


            let production = await Production.find({ /* isConfirmed: false */}).sort('id DESC');
            return exits.success(production//.map(x => {
                // return {
                //     id: x.id,
                //     name: x.productionName,
                //     category: x.category,
                // }
                // }
                //)
            );


        } catch (error) {
            return exits.invalid({
                error: error.message,
            });
        }

    },


};
