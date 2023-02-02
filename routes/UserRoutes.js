//importar a função router do express
const router = require('express').Router()
//importar o controller
const UserController = require('../controllers/UserController')

//rotas de post
router.post('/register', UserController.register)
router.post('/login', UserController.login)

//rotas de get
router.get('/checkuser', UserController.checkUser)

//exportar o arquivo
module.exports = router