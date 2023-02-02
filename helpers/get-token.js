const getToken = (req)=>{

    //pegar os headers de authorization
    const authHeader = req.headers.authorization

    //pegar a seunda parte do token
    const token = authHeader.split(' ')[1]

    //retornar o token
    return token

}

module.exports = getToken