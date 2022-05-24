const axios = require("axios");
const {Genre} = require("../db");
require('dotenv').config();
const {API_KEY} = process.env;

async function getAllGenres () {
    try {
        let genres = (await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results.map(e => ({id: e.id, name: e.name}))
        await Genre.bulkCreate(genres)
        console.log("Genres loaded in DB correctly")
    } catch (error) {
        console.log(error)
    }
}

async function getGenresFromDB (req, res, next) {
    try {
        let genres = await Genre.findAll()
        res.send(genres)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllGenres,
    getGenresFromDB
}