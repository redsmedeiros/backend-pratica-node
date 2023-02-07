//importar o router do express
const router = require('express').Router()
//importar o controller
const PetController = require('../controllers/PetController')

//midlewares
const verifyToken = require('../helpers/verify-token')

//rotas
router.post('/create', verifyToken, PetController.create)

module.exports = router