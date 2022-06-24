module.exports = {


    friendlyName: 'Fetch products',


    description: 'Fetch products.',


    inputs: {
        productName: {
            type: 'string',
            required: true,
            columnName: 'productname'
        },
        imageID: {
            type: 'number',
            columnName: 'imageid'
        },
        price: {
            type: 'number',
            columnName: 'price'
        },
        barcode: {
            type: 'number',
            columnName: 'barcode'
        },
        taxable: {
            type: 'boolean',
            columnName: 'taxable'
        },
        quantity: {
            type: 'number',
            columnName: 'quantity'
        },
        category: {
            type: 'string',
            columnName: 'category'
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
            let product = await Product.create(inputs);
            return exits.success(product);

        } catch (error) {
            return exits.invalid({
                error: error.message,
            });
        }
    },
};
