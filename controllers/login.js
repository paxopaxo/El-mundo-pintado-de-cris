const Usuario = require('../models/usuarioSchema')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers')


const login = async(req, res) => {
    
    const { correo, pass } = req.body

    const usuario = await Usuario.findOne({ correo })    
    const verificationPass = bcrypt.compareSync(pass, usuario.pass)
    
    if (verificationPass) {
        const JWT = await generarJWT(usuario.id)

        res.json({
            msg: 'Ha iniciado sesión correctamente',
            JWT
        })
    } else {
        res.json({
            msg: 'Contraseña incorrecta'
        })
    }

}



module.exports = {
    login
}