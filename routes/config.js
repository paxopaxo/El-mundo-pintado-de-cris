const { Router } = require('express')
const router = Router()



router.get('/', (req,res) => {
    res.render('config')
})


router.get( '/crear', (req, res) => {
    res.render('crear')
})
router.get('/buscar', (req, res) => {
    res.render('buscar')
})
router.get( '/borrar', (req, res) => {
    res.render('borrar')
})
router.get( '/actualizar', (req, res) => {
    res.render('actualizar')
})





module.exports = router