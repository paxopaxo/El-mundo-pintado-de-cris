const { json } = require('express')
const jwt = require('jsonwebtoken')
const { Usuario } = require('../models')

const verify = (token) => {
    return new Promise( (resolve, reject) => {
        jwt.verify(token, process.env.SECRETORPRIVATEKEY, (err, decoded) => {
            if (err) {
                reject(err)
            } else {
                resolve(decoded.uid)
            }
        })
    })
    
}

const verificaJWT = async(req, res, next) => {
    try {
        const token = req.header('token')
        if (!token) return res.json({ msg: 'No has enviado el Token' })

        const id = await verify(token)

        const user = await Usuario.findById(id)

        if (!user) {
            res.json({ msg: 'El id no le corresponde a ningún usuario'})
        } else {
            req.usuarioAutenticado = user
            next()
        }

    } catch(err) {
        res.json({ msg: err.message })
    }    
}

const usuarioAutenticadoEsElMismoOAdmin = (req,res, next) => {
    if (!req.usuarioAutenticado) return res.status(500).json('Para verificar si el usuario es admin debe logearse')
    const { id } = req.params

    if (req.usuarioAutenticado.rol === 'ADMIN' || req.usuarioAutenticado._id === id) {
        next()
    } else {
        res.status(400).json({ msg: 'No puedes eliminar otro usuario que no sea el tuyo propio' }) // Si eres admin si puedes
    }
}

const usuarioEsAdmin = (req, res, next) => {
    if (!req.usuarioAutenticado) return res.status(500).json('Para verificar si el usuario es admin debe logearse')
    const { id } = req.params

    if (req.usuarioAutenticado.rol === 'ADMIN') {
        next()
    } else {
        res.status(400).json({ msg: 'Debes ser admin para realizar esta accion' })
    }
}


module.exports = {
    verificaJWT,
    usuarioAutenticadoEsElMismoOAdmin,
    usuarioEsAdmin
}