const { Router } = require('express')
const router = Router()

const mainPath = __dirname.split("\\").slice(0, -1).join('/')


router.get('/', (req, res) => {
    res.sendFile()
})

router.get('/register', (req, res) => {
    res.sendFile(mainPath + `/public/register.html`)
})

for (let i = 1; i < 12; i++) {
    router.get(`/product${i}`, (req, res) => {
        res.sendFile(`${mainPath}/public/products/product${i}.html`)
    })
}






module.exports = router