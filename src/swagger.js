const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./api.js'];

swaggerAutogen(outputFile, endpointsFiles);