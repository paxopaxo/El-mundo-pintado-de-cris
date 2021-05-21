const path = require('path')

const modelPathCategoria = path.join(__dirname, '../../models/categorias')
const modelPathProducto = path.join(__dirname, '../../models/productos')

const Categoria = require( modelPathCategoria )
const Producto = require( modelPathProducto )


const obtieneCategorias = async(socket) => {
    const categorias = await Categoria.find({estado: true })
    socket.emit('categoria', categorias)
}

const obtieneProductos = async(socket) => {
    const productos = await Producto.find({estado: true })
    socket.emit('producto', productos)
}
    

module.exports = {
    obtieneCategorias,
    obtieneProductos,
}