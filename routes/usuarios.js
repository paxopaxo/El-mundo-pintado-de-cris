const { Router } = require('express')
const { check } = require('express-validator')

const {
    validarCampos,
    verificaJWT,
    usuarioAutenticadoEsElMismoOAdmin
} = require('../middleweres')

const {
    verificaCorreoEnDB,
    verificaIdEsValido
} = require('../middleweres/usuarios')

const {
    obtenerUsuarios,
    crearUsuario,
    eliminarUsuario,
    obtenerUsuarioPorID
} = require('../controllers/usuarios')

const router = Router()

router.get('/', obtenerUsuarios)

router.get('/:id', [
    check('id').notEmpty(),
    check('id').isMongoId(),
    validarCampos,
    verificaIdEsValido
], obtenerUsuarioPorID)

router.post('/', [
    check('correo', 'Debes ingresar un correo').notEmpty(),
    check('correo', 'Debes ingresar un email válido').isEmail(),
    check('username', 'Debes ingresar un username').notEmpty(),
    validarCampos,
    verificaCorreoEnDB,
], crearUsuario)


router.delete('/:id', [
    check('id', 'Debes ingresar un id').notEmpty(),
    check('id', 'Debes ingresar un id de mongo').isMongoId(),
    validarCampos,
    verificaIdEsValido,
    verificaJWT,
    usuarioAutenticadoEsElMismoOAdmin
], eliminarUsuario)

module.exports = router