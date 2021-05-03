const { Usuario } = require("../models")

// Middleweres de Obtener usuario 
const nanverify = (req = request, res, next) => {
    const { desde, limite } = req.params
    if (isNaN(Number(desde)) || isNaN(Number(limite))) return res.status(400).json({ msg: 'Los valores deben ser números' }) // FUNCION isNaN importante
    next()
}


const verificaCorreoEnDB = async(req, res, next) => {
    // verifica que no haya nadie con un correo o username identico 
    const { username, correo, pass } = req.body
    const [verificacion_correo, verificacion_username] = await Promise.all([
        Usuario.findOne({ correo }),
        Usuario.findOne({ username })
    ])
    if (verificacion_correo) return res.status(400).json({ msg: 'El correo ya está registrado' })
    if (verificacion_username) return res.status(400).json({ msg: 'El username ya está registrado' })
    next()
}
const verificaIdEsValido = async(req, res, next) => {
    const { id } = req.params
    const usuario = await Usuario.findById(id)
    if (!usuario) return res.status(400).json({ msg: ' El id no corresponde a ningún usuario' })
    if (!usuario.estado) return res.status(400).json({ msg: 'El usuario ingresado no existe estado: false' })
    next()
}



module.exports = {
    verificaCorreoEnDB,
    verificaIdEsValido
}