const mongoose = require('mongoose')

const { Schema } = mongoose

const usuarios = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true,
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        default: 'ADMIN'
    },
    estado: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Usuario', usuarios)