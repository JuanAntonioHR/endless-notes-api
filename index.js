//Dependencies
const morgan = require('morgan')
const express = require('express') 
const app = express()

//Routes
const nota = require('./routes/nota')

//Middlewares
const notFound = require('./middlewares/notFound')
const index = require('./middlewares/index')
const cors = require('./middlewares/cors')

app.use(cors)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', index)
app.use("/notas", nota)
app.use(notFound)

app.listen(process.env.PORT || 3000, () =>  {
    console.log("Server is running...")
})