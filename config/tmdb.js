require('dotenv').config()
const axios = require('axios')

const tmdbAPI = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_BEARER}`
    }
})

module.exports = tmdbAPI