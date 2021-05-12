
const Usuario = require('../models/usuarioSchema')


const verificaExisteCorreo = async(correo) => {
    const existencia = await Usuario.findOne( { correo })
    if (!existencia) {
        throw new Error(`El correo que has otorgado no está registrado`)
    }
}

module.exports = {
    verificaExisteCorreo
}