const tmdbAPI = require('../config/tmdb')
const cache = require('../config/node-cache')
const parseMovie = require('../models/movie-model')

const searchMovie = async (req, res) => {
    const query = req.query.query

    if (!query) {
        return res.status(400).json({ message: 'parameters is require' })
    }

    if (cache.has(query)) {
        console.log('Fetc data dari cache');
        return res.status(200).json(cache.get(query))
    }

    try {
        const response = await tmdbAPI.get('/search/movie', {
            params: { query }
        })

        const movies = response.data.results.map(parseMovie)
        cache.set(query, movies)
        res.status(200).json(movies)

    } catch (error) {
        console.log(error);
    }
}

const getPopularMovies = async (req, res) => {
    if (cache.has('popular')) {
        console.log('Fetch data dari cache');
        return res.status(200).json(cache.get('popular'))
    }

    try {
        const response = await tmdbAPI.get('/movie/popular')
        const movies = response.data.results.map(parseMovie)
        cache.set('popular', movies)
        res.status(200).json(movies)
    } catch (error) {
        console.log(error);
    }
}

module.exports = { searchMovie, getPopularMovies }