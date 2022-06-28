module.exports = {


    friendlyName: 'Fetch products',


    description: 'Fetch products.',


    inputs: {
        productName: {
            type: 'string',
            required: true,
        },
        imageID: {
            type: 'number',
        },
        price: {
            type: 'number',
        },
        barcode: {
            type: 'number',
        },
        taxable: {
            type: 'boolean',
        },
        quantity: {
            type: 'number',
        },
        category: {
            type: 'string',
        }
    },


    exits: {
        success: {
            description: 'Product added.'
        },
        invalid: {
            statusCode: 400,
            description: 'something fked up',
        },
    },

    fn: async function (inputs,exits) {
        try {
            const product = await Product.create(inputs).fetch();
            return exits.success(product);

        } catch (error) {
            return exits.invalid({ error: error.message });
        }
    },
};
