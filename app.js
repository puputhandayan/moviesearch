require('dotenv').config()
const express = require('express')
const cors = require('cors')
const MovieRouter = require('./routes/movie-router')

const app = express()
const port = process.env.port

app.use(cors())
app.use(express.json())
app.use('/api/movies', MovieRouter)

app.listen(port, () => {
    console.log(`Server Run at http://localhost:${port}/api/movies`)
})
