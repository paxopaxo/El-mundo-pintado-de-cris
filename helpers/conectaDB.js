const mongoose = require('mongoose')

const mongoConnection = async(MONGO_URI = '') => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log('conectado a la base de datos exitosamente')
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = mongoConnection