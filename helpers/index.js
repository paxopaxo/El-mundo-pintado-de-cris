const mongoConnection = require('./conectaDB')
const generarJWT= require('./generaJWT')

module.exports = {
    mongoConnection,
    generarJWT
}