//importar o jsonwebtoken
const jwt = require('jsonwebtoken')

//função de ajuda para cirar token
const createUserToken = async(user, req, res) => {

    //criar um token que retorna o usuario e o id
    const token = jwt.sign({
        name: user.name,
        id: user._id
    },'nossosecret')

    //retornar o token
    res.status(200).json({
        message: 'Você está autenticado',
        token: token,
        userId: user._id
    })

}

module.exports = createUserToken;