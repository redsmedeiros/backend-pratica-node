//importar o express
const express = require('express')
//importar o cors
const cors = require('cors')

//criar a aplicação
const app = express()

//configurar o json
app.use(express.json())

//resolver o cors
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

//configurar pasta de imagem
app.use(express.static('public'))

//configurar rotas

//escutar a porta de back
app.listen(5000)