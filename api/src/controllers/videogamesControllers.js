const axios = require("axios");
const {Op} = require('sequelize');
const {Videogame, Genre} = require("../db");
require('dotenv').config();
const {API_KEY} = process.env;

const getVideogames = async (req, res, next) => {
    const {game} = req.query
    try {
        let condition = game ? {name: {[Op.iLike]: `%${game}%`}} : {}
        let link = game ? `https://api.rawg.io/api/games?search=${game}&key=${API_KEY}` : `https://api.rawg.io/api/games?key=${API_KEY}`
        
        let arrPromises = []
        let videogamesAPI = []

        arrPromises[0] = Videogame.findAll({where: condition, include: Genre})
        .then(res => res.map(e => ({id: e.id, name: e.name, image: e.image, rating: e.rating, genres: e.genres.map(e => e.name)})))

        arrPromises[1] = game
        ? axios(link).then(res => videogamesAPI = videogamesAPI.concat(res.data.results))
        : axios(link)
        .then(res => {
            videogamesAPI = videogamesAPI.concat(res.data.results)
            return axios(res.data.next)
        })
        .then(res => {
            videogamesAPI = videogamesAPI.concat(res.data.results)
            return axios(res.data.next)
        })
        .then(res => {
            videogamesAPI = videogamesAPI.concat(res.data.results)
            return axios(res.data.next)
        })
        .then(res => {
            videogamesAPI = videogamesAPI.concat(res.data.results)
            return axios(res.data.next)
        })
        .then(res => {
            videogamesAPI = videogamesAPI.concat(res.data.results)
        })

        let videogamesDB = await Promise.all(arrPromises).then(results => results[0])
        videogamesAPI = videogamesAPI.map(e => ({id: e.id, name: e.name, image: e.background_image, rating: e.rating, genres: e.genres.map(e => e.name)}))
        let videogames = [...videogamesDB, ...videogamesAPI]

        if (game && videogames.length > 15) videogames.splice(15)
        res.send(videogames)

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getVideogames
}