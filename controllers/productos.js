const { Producto } = require('../models')


const crearProducto = async(req,res) => { // AGREGAR AÑADIR IMAGENES 
    try {
        const { img , estado, usuario, ...resto } = req.body 
        
        const arrayFiltrado = Object.entries(resto).filter( ([keys, values]) => keys === 'nombre' || keys === 'categoria' || keys === 'disponible' || keys === 'descripcion' )
        const objFiltrado = Object.fromEntries(arrayFiltrado)
        
        objFiltrado.nombre = objFiltrado.nombre.toUpperCase()
        objFiltrado.usuario = req.usuarioAutenticado._id

        const producto = new Producto(objFiltrado)
        await producto.save()
        
        const nuevoProducto = await Producto.findOne(objFiltrado).populate('categoria','nombre').populate('usuario',['username','correo'])
    
        res.status(200).json({ msg: `Producto ${resto.nombre} creado correctamente`, nuevoProducto})

    } catch(err) {
        console.log(err)
    }
}

const obtenerProducto = async(req, res) => {
    let { desde = 0, limite = 5 } = req.query // se reciben como string 

    const [SelectedProducts, NumberOfProducts] = await Promise.all([
        Producto.find({ estado: true })
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('categoria','nombre')
            .populate('usuario',['username', 'correo'] ),
        Producto.countDocuments()
    ])
    res.json({
        NumberOfProducts,
        SelectedProducts
    })
}

const obtenerProductoPorId = async(req, res) => {
    const { id } = req.params
    const producto = await Producto.findById(id)
        .populate('categoria','nombre')
        .populate('usuario',['username', 'correo'] )

    res.status(200).json({ producto })
}

const actualizarProducto = async(req, res) => {
    try {
        const { img , estado, usuario, ...resto } = req.body 
        const { id } = req.params
        
        const arrayFiltrado = Object.entries(resto).filter( ([keys, values]) => keys === 'nombre' || keys === 'categoria' || keys === 'disponible' || keys === 'descripcion' )
        const objFiltrado = Object.fromEntries(arrayFiltrado)

        if(objFiltrado.nombre) {
            objFiltrado.nombre = objFiltrado.nombre.toUpperCase()   
        } 
        objFiltrado.usuario = req.usuarioAutenticado._id

        const producto = await Producto.findOneAndUpdate(id, objFiltrado, { new: true })
            .populate('categoria','nombre')
            .populate('usuario',['username', 'correo'] )
        
        res.status(200).json({ msg:'Producto actualizado correctamente', producto })


    } catch(err) {
        console.log(err)
    }
}

const borrarProducto = async(req,res) => {
    const { id } = req.params
    const producto = await Producto.findOneAndUpdate(id, { estado: false }, { new: true })
        .populate('categoria','nombre')
        .populate('usuario',['username', 'correo'] )
    res.status(200).json({ msg: 'El usuario ha sido eliminado correctamente', producto })
}

module.exports = {
    crearProducto,
    obtenerProducto,
    obtenerProductoPorId,
    actualizarProducto,
    borrarProducto
}