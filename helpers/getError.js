
// getError devuelve el error de la misma forma que express-validator

const getError = (msg, param = undefined) => {
    return {
        errors: [
            {
                msg,
                param
            }
        ]
    }
}

module.exports = getError