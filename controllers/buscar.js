const { ObjectId } = require('mongoose').Types
const { Usuario, Categoria, Producto } = require('../models')
const { getError } = require('../helpers')

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos'
]

const buscarUsuarios = async(termino = '', res) => {
    const esMongoID = ObjectId.isValid(termino) // verifica que es mongoID
    if (esMongoID) {
        const usuario = await Usuario.findById(termino)
        return res.json({
            resultados: (usuario) ? [usuario] : []
        })
    }

    const regex = new RegExp(termino, 'i')
    const usuarios = await Usuario.find({
        $or: [{ username: regex }, { correo: regex }],
        $and: [{ estado: true }]
    })

    res.json(usuarios)
}
const buscarCategorias = async(termino, res) => {
    const esMongoID = ObjectId.isValid(termino) // verifica que es mongoID
    if (esMongoID) {
        const categoria = await Categoria.findById(termino)
        return res.json({
            resultados: (categoria) ? [categoria] : []
        })
    }

    const regex = new RegExp(termino, 'i')
    const categorias = await Categoria.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    })
    res.json(categorias)
}

const buscarProductos = async(termino, res) => {
    const esMongoID = ObjectId.isValid(termino) // verifica que es mongoID
    if (esMongoID) {
        const producto = await Producto.findById(termino)
        return res.json({
            resultados: (producto) ? [producto] : []
        })
    }
    const regex = new RegExp(termino, 'i')
    const productos = await Producto.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    })
    res.json(productos)
}


const buscar = async(req, res = response) => {
    const { coleccion, termino } = req.params

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json( getError(`Las colecciones permitidas son las siguientes ${coleccionesPermitidas}`) )
    }
    switch (coleccion) {
        case 'usuarios':
            await buscarUsuarios(termino, res)
            break;
        case 'categorias':
            await buscarCategorias(termino, res)
            break;
        case 'productos':
            await buscarProductos(termino, res)
            break;
        default:
            res.status(500).json( getError('rer') )
    }

}


module.exports = {
    buscar
}