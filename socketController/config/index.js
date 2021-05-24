const path = require('path')

const modelPathCategoria = path.join(__dirname, '../../models/categorias')
const modelPathProducto = path.join(__dirname, '../../models/productos')

const Categoria = require( modelPathCategoria )
const Producto = require( modelPathProducto )


const obtieneCategorias = async(socket) => {

    const categorias = await Categoria.find({estado: true })
    socket.emit('categoria', categorias)
    
    const productos = await Producto.find({estado: true })
    socket.emit('producto', productos)

    socket.on('producto-on-server', async(payload) => {
        const productos = await Producto.find({estado: true })
        socket.emit('producto', productos)
    })

    socket.on('categoria-on-server', async(payload) => {
        const categorias = await Categoria.find({ estado: true })
        socket.emit('categoria', categorias)
    })
}

    

module.exports = { 
    obtieneCategorias
}