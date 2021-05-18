const path = require('path')
const modelPath = path.join(__dirname, '../../models/categorias')

const Categoria = require( modelPath )

const socketControllerCrear = async(socket) => {
    const categorias = await Categoria.find({estado: true })
    socket.emit('categoria', categorias)
}

module.exports = socketControllerCrear