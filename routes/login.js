const { Router } = require('express')
const { check } = require('express-validator')

const { verificaExisteCorreo } = require('../express-validator')
const { validarCampos } = require('../middleweres')


const router = Router()

const { login } = require('../controllers/login')


router.post('/',[
    check('correo', 'Debes ingresar un correo válido').isEmail(),
    check('correo','Debes ingresar un correo').notEmpty(),
    check('pass','Debes ingresar la contraseña').notEmpty(),
    validarCampos,
    check('correo').custom(verificaExisteCorreo),
    validarCampos
], login)




module.exports = router