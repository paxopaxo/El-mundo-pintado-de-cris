const Usuario = require('../models/usuarioSchema')
const bcrypt = require('bcryptjs')
const { generarJWT, getError } = require('../helpers')

// getError devuelve el error de la misma forma que express-validator

const login = async(req, res) => {
    
    const { correo, pass } = req.body

    const usuario = await Usuario.findOne({ correo })
    const verificationPass = bcrypt.compareSync(pass, usuario.pass)
    
    if (verificationPass) {
        const JWT = await generarJWT(usuario.id)

        res.status(200).json({
            msg: 'Ha iniciado sesión correctamente',
            JWT,
            isAdmin: usuario.rol == 'ADMIN' ? true : false
        })
    } else {
        res.status(400).json( getError('La contraseña es incorrecta','pass') )
    }

}



module.exports = {
    login
}