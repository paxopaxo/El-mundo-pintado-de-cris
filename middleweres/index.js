const { validarCampos } = require('./validarCampos')
const { verificaJWT, usuarioAutenticadoEsElMismoOAdmin, usuarioEsAdmin} = require('./validaJWT')

module.exports = {
    validarCampos,
    verificaJWT,
    usuarioAutenticadoEsElMismoOAdmin,
    usuarioEsAdmin
}