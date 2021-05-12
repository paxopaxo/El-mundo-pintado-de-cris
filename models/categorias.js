const {Schema, model} = require('mongoose')

const categorias = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Categoria', categorias)