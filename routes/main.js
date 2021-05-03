const { Router } = require('express')
const router = Router()

const mainPath = __dirname.split("\\").slice(0, -1).join('/')


router.get('/', (req, res) => {
    res.render('index')
})

router.get('/register', (req, res) => {
    res.render('register')
})

for (let i = 1; i < 12; i++) {
    router.get(`/product${i}`, (req, res) => {
        res.render(`products/product${i}`)
    })
}






module.exports = router