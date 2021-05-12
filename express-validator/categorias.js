const { Categoria } = require('../models')

const categoriaExisteEnDB = async(nombre) => {
    const upperNombre = nombre.toUpperCase()
    const existencia = await Categoria.findOne( { nombre: upperNombre })
    if (existencia) {
        throw new Error(`La categoria ya existe`)
    }
}

const categoriaPorIdExisteEnDB = async(id) => {
    const existe = await Categoria.findById(id)
    if(!existe) {
        throw new Error(`La categoria no existe`)
    }
}


module.exports = {
    categoriaExisteEnDB,
    categoriaPorIdExisteEnDB
}

