const { Router } = require('express')
const { check } = require('express-validator')

const { verificaExisteCorreo } = require('../express-validator')
const { categoriaExisteEnDB, categoriaPorIdExisteEnDB } = require('../express-validator/categorias')

const { validarCampos, verificaJWT, usuarioEsAdmin } = require('../middleweres')
const { crearCategoria, obtenerCategoria, actualizarCategoria, obtenerCategoriaPorId, borrarCategoria } = require('../controllers/categorias')

const router = Router()

router.get('/', obtenerCategoria)

router.get('/:id', [
    check('id', 'Debes ingresar un id').notEmpty(),
    check('id','Debes ingresar un id de mongo').isMongoId(),
    validarCampos,
    check('id').custom(categoriaPorIdExisteEnDB),
    validarCampos
], obtenerCategoriaPorId)


router.post('/',[
    check('nombre','Debes asignar un nombre a la categoria').notEmpty(),
    validarCampos,
    check('nombre').custom(categoriaExisteEnDB),
    validarCampos,
    verificaJWT,
    usuarioEsAdmin
], crearCategoria)

router.put('/:id', [
    check('id', 'Debes ingresar un id').notEmpty(),
    check('id','El id no es de mongo').isMongoId(),
    check('nombre', 'Debes ingresar el nuevo nombre de la categoria').notEmpty(),
    validarCampos,
    check('id').custom(categoriaPorIdExisteEnDB),
    validarCampos
    
], actualizarCategoria)


// TODO PARA CUANDO TENGA HECHO LOS PRODUCTOS


router.delete('/:id', [
    check('id', 'Debes ingresar un id').notEmpty(),
    check('id','El id no es de mongo').isMongoId(),
    validarCampos,
    check('id').custom(categoriaPorIdExisteEnDB),
    validarCampos,
    verificaJWT,
    usuarioEsAdmin
], borrarCategoria )






module.exports = router









