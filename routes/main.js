const { Router } = require('express')
const router = Router()


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