const { Schema, model} = require('mongoose')

const productos = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
        default: null
    },
    estado: {
        type: Boolean,
        default: true
    },
    disponible: {
        type: Boolean,
        default: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    descripcion: {
        type: String,
        default: null 
    }
})

module.exports = model('Producto', productos)