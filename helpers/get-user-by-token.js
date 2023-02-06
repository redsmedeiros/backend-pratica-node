//importar o jsonwebtoken
const jwt = require('jsonwebtoken')
//importar o model
const User = require('../models/User')

//pegar o usuario através do token
const getUserByToken = async (token, res)=>{

    //verificar se o token veio
    if(!token){
        return res.status(401).json({message: 'Acesso Negado'})
    }

    //decodificar o token
    const decoded = jwt.verify(token, 'nossosecret')

    //pegar o id do usuario
    const userId = decoded.id

    //procurar o usuario no banco com esse id
    const user = await User.findOne({_id: userId})

    //retornar o usuario encontrado
    return user
}

module.exports = getUserByToken