//importar o model
const Pet = require('../models/Pet')

//importar os helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

//exportar a classe de controller
module.exports = class PetController{

    //para criar um pet
    static async create(req, res){

        //pegar os dados da requisição
        const { name, age, weigth, color } = req.body

        //setar o available
        const available = true 

        //fazer o upload das imagens
        const images = req.files

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

        if(images.length === 0){
            res.status(422).json({message: 'A imagem é obrigatória'})
        }

        //pegar o usuario dono do pet do banco - aquele que cadastrou
        const token = getToken(req)
        const user = await getUserByToken(token)

        //criar um ibj desse pet atraves do model
        const pet = new Pet({
            name: name,
            age: age,
            weigth: weigth,
            color: color,
            available: available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                user: user.phone
            }
        })

        //usar o metodo map para executar um metodo no array de images
        images.map((image)=>{
            pet.images.push(image.files)
        })

        //salvar o usuario no banco
        try{

             //atraves do model salvar no banco
             const newPet = await pet.save()

             //retornar o pet
             res.status(201).json({message: 'Pet cadastrado com sucesso', newPet})

        }catch(error){

            res.status(500).json({message: error})
        }

    }

    //rotas para pegar todos os pets
    static async getAll(req, res){

        //trazer todos os pets - usar o metodo sort para filtrar os mais novos
        const pets = await Pet.find().sort('-createdAt')

        //retornar a busca
        res.status(200).json({pets: pets})

    }

    //pegar os pets do usuario
    static async getAllUserPets(req, res){

        //pegar o usuario atraves do token - filtrar com o id do usuario
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({'adopter._id': adopter._id}).sort('-createdAt')

        //retornar os pets do usuario
        res.status(200).json({pets})

    }

    //pegar todas as adoções do usuário
    static async getAllUserAdoptions(req, res){

        //obter o usuario atraves do token
        const token = getToken(req)
        const user = await getUserByToken(token)


    }

    //pegar o pet por id
    static async getPetById(req, res){

        //pegar o id do params
        const id = req.params.id

        //verificar se o id é válido
        if(!ObjectId.isValid(id)){
            res.status(422).json({message: 'ID inválido'})
            return;
        }

        //verificar se existe um pet com esse id
        const pet = await Pet.findOne({_id: id})

        if(!pet){
            res.status(404).json({message: 'Pet não cadastrado'})
            return;
        }

        //retornar o pet
        res.status(200).json({pet})
    }

    //função para deletar o pet
    static async removePetById(req, res){

        //pegar o id atraves dos params da req
        const id = req.params.id

        //verificar se o id é válido
        if(!ObjectId.isValid(id)){
            res.status(422).json({message: 'ID inválido'})
            return;
        }

        //verificar se o pet está no banco
        const pet = await pet.findOne({_id: id})

        if(!pet){
            res.status(404).json({message: 'Pet não cadastrado'})
            return;
        }

        //verificar se o usuário cadastrou esse pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        //se um id for totalmente diferente do outro
        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({message: 'Falha...'})
            return;
        }

        //deleter o pet
        await Pet.findByIdAndRemove(id)

        res.status(200).json({message: 'Pet removido com sucesso'})

    }

    //atualizar pet
    static async updatePet(req, res){

        //pegar o id dos params da req
        const id = req.params.id

        //pegar os dados vindos do corpo da requisição - form
        const { name, age, weigth, color, available } = req.body

        //pegar dos arquivos de requisição as imagens
        const images = req.files

        //objeto vazio - dados que serão atualizados para o pet
        const updatedData = {}

        //fazer as validações de exitencia
        const pet = await Pet.findOne({_id: id})

        if(!pet){
            res.status(404).json({message: 'Pet não encontado'})
            return;
        }

        //verificar se o usuário cadastrou esse pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        //se um id for totalmente diferente do outro
        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({message: 'Falha...'})
            return;
        }

          //verificar se as variaveis vieram
          if(!name){
            res.status(422).json({message: "O nome é obrigatório"})
            return
        }else{

            updatedData.name = name
        }

        if(!age){
            res.status(422).json({message: "A idade é obrigatória"})
            return
        }else{
            updatedData.age = age
        }

       

        if(!weigth){
            res.status(422).json({message: "O peso é obrigatório"})
            return
        }else{
            updatedData.weigth = weigth
        }

      

        if(!color){
            res.status(422).json({message: 'A cor é obrigatória'})
            return
        }else{
            updatedData.color = color
        }

       

        if(images.length === 0){

            res.status(422).json({message: 'A imagem é obrigatória'})

        }else{

            updatedData.images = []

            images.map((images)=>{
                updatedData.images.push(image.filename)

            })
        }

        await Pet.findByIdAndUpdate(id, updatedData)

        res.status(200).json({message: 'atualizado com sucesso'})

       
    }


    static async schedule(req, res){

        //pegar o id do pet
        const id = req.params.id

        //verificar a existencia do pet no banco
        const pet = await Pet.findById(id)

        if(!pet){
            res.status(404).json({message: 'Não encontrado'})
            return
        }

        //verificar se o pet pertence ao usuario
        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.equals(user._id)){
            res.status(422).json({message: 'Você não pode agendar visita para o próprio pet'})
            return;
        }

        //verificar se o usuario já agendou visita para o pet
        if(pet.adopter){
            if(pet.adopter._id.equals(user._id)){
                res.status(422).json({message: 'Você já agendou uma visita para esse pet'})
                return
            }
        }

        //adicionar usuario para a visita do pet
        pet.adopter = {
            _id: user._id,
            name: user.name,
            image: user.image
        }

        await Pet.findByIdAndUpdate(id, pet)

        res.status(200).json({message: `A visita foi agendada com sucesso. Entre em contato com ${pet.user.name}`})


    }

    static async concludeAdoption(req, res){

        const id = req.params.id

          //verificar a existencia do pet no banco
          const pet = await Pet.findById(id)

          if(!pet){
              res.status(404).json({message: 'Não encontrado'})
              return
          }

          //dizer que o pet não esta disponivel
          pet.available = false

    }

}