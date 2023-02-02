//importar o models da tabela de usuarios
const User = require('../models/User')
const brcypt = require('bcrypt')
const createUserToken = require('../helpers/create-user-token')

//exportar a classe do controler de User
module.exports = class UserController{

    //metodo static e async passando req e res - CREATE
    static async register(req, res){
        //  receber os dados do corpo da requisição - form
        const name = req.body.name
        const email = req.body.email
        const phone = req.body.phone
        const password = req.body.password
        const confirmpassword = req.body.confirmpassword

        //fazer a validação de existencias do dados obrigatorios
        if(!name){
            res.status(422).json({message: 'Nome é obrigatório'})
            return
        }

        if(!email){
            res.status(422).json({message: 'Email é obrigatório'})
            return
        }

        if(!phone){
            res.status(422).json({message: 'Telefone é obrigatório'})
            return
        }

        if(!password){
            res.status(422).json({message: 'Senha é obrigatório'})
            return
        }

        if(!confirmpassword){
            res.status(422).json({message: 'Confirmação é obrigatório'})
            return
        }

        //nesse caso verificar se a senha é igual ao confirma
        if(password !== confirmpassword){
            res.status(422).json({message: 'Senha deve ser igual a confirmação'})
            return
        }

        //verficar se o usuario ja esta cadastrado no banco - procurar um usuario com esse email
        const userExist = await User.findOne({email: email})

        if(userExist){
            res.status(422).json({message: 'Email já cadastrado'})
            return
        }

        //nesse caso, criptografar a senha
        const salt = await brcypt.genSalt(12)
        const passwordHash = await brcypt.hash(password, salt)

        //criar um objeto usuario passando os dados do corpo da requisição
        const user = new User({
            name: name,
            email: email,
            phone: phone,
            password, passwordHash
        })

        //fazer um try para salvar no banco
        try{

            //salvar o usuario no banco
            const newUser = await user.save()

            //criar um token atraves do helpers
            await createUserToken(newUser, req, res)

        }catch(err){
            res.status(500).json({message: 'Erro ao salvar' + err})
        }
    }

    //metodo responsavel pelo login
    static async login(req, res){

        //receber as variaveis do corpo da requisição - form
        const { email, password} = req.body

        //verficar se o email e a senha vieram
        if(!email){
            res.status(422).json({message: 'Email é obrigatório'})
            return
        }

        //verficar se a senha veio
        if(!password){
            res.status(422).json({message: 'Senha é obrigatória'})
            return
        }

        //procurar pelo usuario no banco
        const user = await User.findOne({email: email})

        //verificar se tem o usuario no banco, se não tiver responder
        if(!user){
            res.status(422).json({message: 'Email não cadastrado'})
        }

        //verificar se a senha do usuario está correta
        const checkPassword = await brcypt.compare(password, user.password)

        //responder se a senha estiver errada
        if(!checkPassword){
            res.status(422).json({message: 'Senha inválida'})
            return
        }

        //finalizar enviando um token
        await createUserToken(user, req, res)
    }

    //metodo para obter o usuario
    static async checkUser(req, res){

        let currentUser

        //fazer a verificação do token nos headers
        if(req.headers.authorization){

        }else{
            //se não veio o token o usuario é invaldio
            currentUser = null
        }

        //enviar o usuario
        res.status(200).send(currentUser)
    }

}