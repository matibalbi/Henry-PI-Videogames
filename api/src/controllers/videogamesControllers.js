const axios = require("axios");
const {Op} = require('sequelize');
const {Videogame, Genre} = require("../db");
require('dotenv').config();
const {API_KEY} = process.env;

const getVideogamesfromDB = async (req, res, next) => {
    const {game} = req.query
    try {
        let condition = game ? {name: {[Op.iLike]: `%${game}%`}} : {}
        
        let videogamesFromDB = await Videogame.findAll({where: condition, include: Genre})

        videogamesFromDB = videogamesFromDB.map(e => ({id: e.id, name: e.name, image: e.image, rating: e.rating, genres: e.genres.map(e => e.name)}))
        
        res.send(videogamesFromDB)

    } catch (error) {
        next(error)
    }
}

const getVideogamesFromAPI = async (req, res, next) => {
    const {game} = req.query
    try {
        let link = game ? `https://api.rawg.io/api/games?search=${game}&key=${API_KEY}` : `https://api.rawg.io/api/games?key=${API_KEY}`
        
        let videogamesAPI = []

        game
        ? await (axios(link).then(res => videogamesAPI = videogamesAPI.concat(res.data.results)))
        : await (axios(link)
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
        )

        videogamesAPI = videogamesAPI.map(e => ({id: e.id, name: e.name, image: e.background_image, rating: e.rating, genres: e.genres.map(e => e.name)}))
        
        res.send(videogamesAPI)

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getVideogamesfromDB,
    getVideogamesFromAPI
}