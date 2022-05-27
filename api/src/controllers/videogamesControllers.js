const axios = require("axios");
const {Op} = require('sequelize');
const {Videogame, Genre} = require("../db");
require('dotenv').config();
const {API_KEY} = process.env;

async function getVideogames (req, res, next) {
    const {game} = req.query
    try {
        let condition = game ? {name: {[Op.iLike]: `%${game}%`}} : {}
        let link = game ? `https://api.rawg.io/api/games?search=${game}&key=${API_KEY}` : `https://api.rawg.io/api/games?key=${API_KEY}`
        
        let arrPromises = []

        arrPromises[0] = Videogame.findAll({where: condition, include: Genre})
        .then(res => res.map(e => ({id: e.id, name: e.name, image: e.image, genres: e.genres.map(e => e.name)})))

        arrPromises[1] = axios(link)
        .then(res => res.data.results.map(e => ({id: e.id, name: e.name, image: e.background_image, genres: e.genres.map(e => e.name)})))

        let videogames = await Promise.all(arrPromises).then(results => [...results[0], ...results[1]])

        if (!videogames.length) res.status(404).send("No videogames found")
        if (game && videogames.length > 15) videogames.splice(15)
        res.send(videogames)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getVideogames
}