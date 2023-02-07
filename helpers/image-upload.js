const multer = require('multer')
const path = require('path')

//destino das imagens
const imageStore = multer.diskStorage({
    destination: function(req, file, cb){

        let folder = ''

        if(req.baseUrl.includes('users')){

            folder = 'users'

        }else if(req.baseUrl.includes('pets')){

            folder = 'pets'
        }

        cb(null, `public/images/${folder}`)

    },
    filename: function (req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStore,
    fileFilter(req, res, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error("Envie jpg ou png"))
        }
        cb(undefined, true)
    }
})

module.exports = {imageUpload}