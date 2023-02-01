//importar a conexao com o db
const mongoose = require('../db/conn')

//fazer um destructuring do schema
const { Schema } = mongoose

//modelar o user
const User = mongoose.model(
    'User',
    new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        phone: {
            type: String,
            required: true
        }
    },
    { timestamps: true }    
    )
)

//exportar o usuario
module.exports = User