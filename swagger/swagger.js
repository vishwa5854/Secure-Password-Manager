const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    info: {
        title       : 'IWR',
        version     : '3.0.0',
        description : 'IWR API'
    },
}

const DisableAuthorizePlugin = function () {
    return {
        wrapComponents: {
            authorizeBtn: () => () => null,
        },
    }
}

const swaggerOptions = {
    swaggerOptions: {
        plugins: [
            DisableAuthorizePlugin,
        ],
        defaultModelsExpandDepth: -1,
    },
}

const options = {
    swaggerDefinition: swaggerDefinition,
    apis: [`${__dirname}/*.yaml`],
}

const swaggerSpec = swaggerJSDoc(options)

module.exports = { swaggerSpec, swaggerOptions }
