//importar o mongoose
const mongoose = require('mongoose')

//criar uma função async para a conexao
async function main(){

    //criar uma metodo await de conexao
    mongoose.set("strictQuery", true);
    await mongoose.connect('mongodb://127.0.0.1:27017/praticaUm')
}