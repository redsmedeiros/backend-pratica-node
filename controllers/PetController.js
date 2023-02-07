//importar o model
const Pet = require('../models/Pet')

//importar os helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

//exportar a classe de controller
module.exports = class PetController{

    //para criar um pet
    static async create(req, res){

        //pegar os dados da requisição
        const { name, age, weigth, color } = req.body

        //setar o available
        const available = true 

        //fazer o upload das imagens

        //verificar se as variaveis vieram
        if(!name){
            res.status(422).json({message: "O nome é obrigatório"})
            return
        }

        if(!age){
            res.status(422).json({message: "A idade é obrigatória"})
            return
        }

        if(!weigth){
            res.status(422).json({message: "O peso é obrigatório"})
            return
        }

        if(!color){
            res.status(422).json({message: 'A cor é obrigatória'})
            return
        }

        //pegar o usuario dono do pet do banco - aquele que cadastrou


        //criar um ibj desse pet atraves do model
        const pet = new Pet({
            name: name,
            age: age,
            weigth: weigth,
            color: color,
            available: available,
            images: [],
            user: {

            }
        })

    }

}