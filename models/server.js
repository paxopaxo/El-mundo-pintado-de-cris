const express = require('express')
const cors = require('cors')
const path = require('path');
const { socketControllerCrear } = require('../socketController/config/')

// conexion a los helpers 
const { mongoConnection } = require('../helpers')

class Server {
    constructor() {
        this.app = express()
        this.http = require('http').Server( this.app )
        this.io = require('socket.io')( this.http )
        this.port = process.env.PORT
        this.mongo_uri = process.env.MONGODB_URI
        this.hbs = require('hbs')
        this.routesPath = {
            main: '/',
            config: '/config',
            usuarios: '/api/usuarios',
            images: '/api/images',
            login: '/api/login',
            categorias: '/api/categorias',
            productos: '/api/productos',
            buscar: '/api/buscar'
        }


        this.conectaDB()
            // Conectarse a la base de datos 

        this.handlebars()

        this.middleweres()
            // ejecuta los middleweres globales

        this.sockets()

        this.routes()
            //añade las rutas
    }

    async conectaDB() {
        await mongoConnection(this.mongo_uri)
    }

    middleweres() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    handlebars() {
        this.app.set('view engine', 'hbs')
        this.hbs.registerPartials(path.join(__dirname, '../views/partials'))
    }

    routes() {
        // Pages
        this.app.use(this.routesPath.main, require('../routes/main'))
        this.app.use(this.routesPath.config, require('../routes/config'))

        // API
        this.app.use(this.routesPath.usuarios, require('../routes/usuarios'))
        this.app.use(this.routesPath.login, require('../routes/login'))
        this.app.use(this.routesPath.categorias, require('../routes/categorias'))
        this.app.use(this.routesPath.productos, require('../routes/productos'))
        this.app.use(this.routesPath.buscar, require('../routes/buscar'))

    }

    sockets() {
        this.io.on('connection', socketControllerCrear)
    }

    listen() {
        this.http.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ', this.port)
        })
    }

}

module.exports = Server