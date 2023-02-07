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
const UserRoutes = require('./routes/UserRoutes')
app.use('/users', UserRoutes)

const PetRoutes = require('./routes/PetRoutes')
app.use('pets', PetRoutes)

//escutar a porta de back
app.listen(5000)