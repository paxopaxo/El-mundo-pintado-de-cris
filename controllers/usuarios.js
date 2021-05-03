const { Usuario } = require('../models')
const { request, json } = require('express')
    // bcrypt config and export
const bcrypt = require('bcryptjs')

const obtenerUsuarios = async(req, res) => {
    let { desde = 0, limite = 5 } = req.query // se reciben como string 

    const [SelectedUsers, NumberOfUsers] = await Promise.all([
        Usuario.find({ estado: true }).skip(Number(desde)).limit(Number(limite)),
        Usuario.countDocuments()
    ])
    res.json({
        NumberOfUsers,
        SelectedUsers
    })
}

const crearUsuario = async(req, res) => {
    const { username, correo, pass } = req.body
    try {
        const salt = bcrypt.genSaltSync(10)
        const pass_hash = bcrypt.hashSync(pass, salt)

        const data = {
            username,
            correo,
            pass: pass_hash
        }
        const usuario_nuevo = new Usuario(data)
        await usuario_nuevo.save()

        res.status(201).json({ msg: 'Usuario creado correctamente', data })
    } catch (error) {
        console.log(error)
    }
}

const eliminarUsuario = async(req = request, res) => {
    try {
        const { id } = req.params
        await Usuario.findByIdAndUpdate(id, { estado: false })
        res.json({ msg: 'Se ha borrado al usuario siguiente', usuario })

    } catch (error) {
        console.log(error)
    }

}
const obtenerUsuarioPorID = async(req, res) => {
    try {
        const { id } = req.params
        const usuario = await Usuario.findById(id)
        res.json({ msg: `El usuario correspondiente al id ${id} es el siguiente`, usuario })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Ocurrió un error en el server' })
    }
}







module.exports = {
    obtenerUsuarios,
    crearUsuario,
    eliminarUsuario,
    obtenerUsuarioPorID
}