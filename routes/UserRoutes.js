//importar a função router do express
const router = require('express').Router()
//importar o controller
const UserController = require('../controllers/UserController')

//importar os middlewares
const verifyToken = require('../helpers/verify-token')  
const { imageUpload } = require('../helpers/image-upload')

//rotas de post
router.post('/register', UserController.register)
router.post('/login', UserController.login)

//rotas de get
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)

//rotas de atualização
router.patch('/edit/:id', verifyToken, imageUpload.single('image'), UserController.editUser)

//exportar o arquivo
module.exports = router