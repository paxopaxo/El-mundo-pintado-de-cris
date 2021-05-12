const { Categoria } = require('../models')


const obtenerCategoria = async(req, res) => {

    let { desde = 0, limite = 10 } = req.query // se reciben como string 

    const [SelectedUsers, NumberOfUsers] = await Promise.all([
        Categoria.find({ estado: true })
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', ['correo', 'username']),
        Categoria.countDocuments()
    ])
    res.json({
        NumberOfUsers,
        SelectedUsers
    })
}

const crearCategoria = async(req,res) => {

    try {
        const nombre = req.body.nombre.toUpperCase()
        const { _id } = req.usuarioAutenticado
        
        const data = {
            nombre,
            usuario: _id,
        }
        const newCategory = new Categoria(data)
        await newCategory.save()
        
        res.json({
            msg:'Categoría creada correctamente',
            categoria: newCategory
        })
    } catch(err) {
        console.log(err)
    }
}

const actualizarCategoria = async(req, res) => {
    try {
        const { id } = req.params
        const { _id, estado, ...datos } = req.body
        datos.nombre = datos.nombre.toUpperCase()

        const categoria = await Categoria.findByIdAndUpdate(id, datos, { new: true }).populate('usuario', ['username', 'correo'])
        
        res.json({
            msg: 'El nombre de la categoria ha sido actualizada',
            categoria
        })

    } catch(err) {
        console.log(err)
    }
}

const obtenerCategoriaPorId = async(req, res) => {
    try {
        const { id } = req.params
        const categoria = await Categoria.findById(id).populate('usuario', ['username','correo'])

        res.json({
            categoria
        })

    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    crearCategoria,
    obtenerCategoria,
    actualizarCategoria,
    obtenerCategoriaPorId
}