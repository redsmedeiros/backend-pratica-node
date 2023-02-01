//importar a conexao com o db
const mongoose = require('../db/conn')

//fazer um destructuring do schema
const { Schema } = mongoose

//modelar o user
const Pet = mongoose.model(
    'Pet',
    new Schema({
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        weigth: {
            type: Number,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        images: {
            type: Array,
            required: true
        },
        available:{
            type: Boolean
        },
        user: Object,
        adopter: Object
    },
    { timestamps: true }    
    )
)

//exportar o usuario
module.exports = Pet