const { Router } = require('express')
const { check } = require('express-validator')

const { crearProducto, obtenerProducto, obtenerProductoPorId, actualizarProducto, borrarProducto } = require('../controllers/productos')
const { productoPorIdExisteEnDB, productoPorNombreExisteEnDB } = require('../express-validator/productos')
const { validarCampos, verificaJWT, usuarioEsAdmin } = require('../middleweres')

const router = Router()

router.get('/',obtenerProducto)

router.get('/:id',[
    check('id','Debes ingresar un id').notEmpty(),
    check('id','Debes ingresar un id').isMongoId(),
    validarCampos,
    check('id').custom(productoPorIdExisteEnDB),
    validarCampos
], obtenerProductoPorId)

router.post('/', [
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('categoria', 'La categoria es obligatoria').notEmpty(), //La imagen debe ser única
    check('categoria','La categoria debe ser un id').isMongoId(),
    validarCampos,
    check('nombre').custom(productoPorNombreExisteEnDB),
    validarCampos,
    verificaJWT,
    usuarioEsAdmin
], crearProducto)

router.put('/:id', [
    check('id','Debes ingresar un id').notEmpty(),
    check('id','Debes ingresar un id').isMongoId(),
    validarCampos,  // SOLO ENVIAR LO QUE SE NECESITE CAMBIAR
    check('id').custom(productoPorIdExisteEnDB),
    check('nombre').custom(productoPorNombreExisteEnDB).optional(),
    validarCampos,
    verificaJWT,
    usuarioEsAdmin
], actualizarProducto)

router.delete('/:id',[
    check('id', 'Debes ingresar un id').notEmpty(),
    check('id','Debes ingresar un id').isMongoId(),
    validarCampos,
    check('id').custom(productoPorIdExisteEnDB),
    validarCampos,
    verificaJWT,
    usuarioEsAdmin
], borrarProducto)



module.exports = router