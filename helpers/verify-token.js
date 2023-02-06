//importar o jwt
const jwt = require('jsonwebtoken')
//importar a função de importar o token
const getToken = require('./get-token')

//middleware para validar o token e chamar a próxima função
const checkToken = (req, res, next)=>{

    //verificar se tem authorization no headers
    if(!req.headers.authorization){
        return res.status(401).json({message: 'Acesso negado'})
    }

    //pegar o token dos headers
    const token = getToken(req)

    //se não existir o token negar o acesso
    if(!token){

        return res.status(401).json({message: 'Acesso negado'})
    }

    try{

        //verificar o token
        const verified = jwt.verify(token, 'nossosecreet')

        req.user = verified
        next()

    }catch(err){

        return res.status(400).json({message: 'Token Inválido'})

    }

}

module.exports = checkToken