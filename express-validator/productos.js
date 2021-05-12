const { Producto } = require('../models')

const productoPorIdExisteEnDB = async(id) => {
    const existe = await Producto.findById(id)
    if(!existe) {
        throw new Error(`El producto no existe`)
    }
}
const productoPorNombreExisteEnDB = async(nombre) => {
    const nombreUpperCase = nombre.toUpperCase()
    const existe = await Producto.findOne({ nombre: nombreUpperCase })
    if(existe) {
        throw new Error(`El producto ${nombre} ya existe`)
    }
}

module.exports = {
    productoPorIdExisteEnDB,
    productoPorNombreExisteEnDB
}