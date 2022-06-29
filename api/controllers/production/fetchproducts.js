module.exports = {


    friendlyName: 'Fetch products',


    description: 'Fetch products.',


    inputs: {
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

    fn: async function (inputs,exits) {
        try {
            let products = await Product.find();
            return exits.success(products.map(x => {
                return {
                    id: x.id,
                    name: x.productName,
                    category: x.category,
                    quantity: x.quantity,
                }
            }
            ));

        } catch (error) {
            return exits.invalid({
                error: error.message,
            });
        }

    },


};
