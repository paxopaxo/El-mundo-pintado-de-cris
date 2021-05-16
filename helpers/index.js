const mongoConnection = require('./conectaDB')
const generarJWT= require('./generaJWT')
const getError = require('./getError')

module.exports = {
    mongoConnection,
    generarJWT,
    getError
}