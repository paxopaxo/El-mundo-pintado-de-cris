const express = require('express')
const cors = require('cors')
const path = require('path');

// conexion a los helpers 
const { mongoConnection } = require('../helpers')


console.log(path.join(__dirname, '../views/partials'))
class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.mongo_uri = process.env.MONGODB_URI
        this.hbs = require('hbs')
        this.routesPath = {
            usuarios: '/api/usuarios',
            main: '/',
            images: '/api/images'
        }


        this.conectaDB()
            // Conectarse a la base de datos 

        this.handlebars()

        this.middleweres()
            // ejecuta los middleweres globales
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
        this.app.use(this.routesPath.main, require('../routes/main'))
        this.app.use(this.routesPath.usuarios, require('../routes/usuarios'))
        this.app.use(this.routesPath.images, require('../routes/img'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ', this.port)
        })
    }

}

module.exports = Server