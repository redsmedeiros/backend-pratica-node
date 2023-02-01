//importar a função router do express
const router = require('express').Router()
//importar o controller
const UserController = require('../controllers/UserController')

//rotas de post
router.post('/register', UserController.register)

//exportar o arquivo
module.exports = router