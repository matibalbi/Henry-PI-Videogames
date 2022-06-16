const axios = require("axios");
const {Genre} = require("../db");
require('dotenv').config();
const {API_KEY} = process.env;

const getAllGenres = async () => {
    try {
        let genres = (await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results.map(e => ({id: e.id, name: e.name}))
        await Genre.bulkCreate(genres)
        console.log("Genres loaded in DB correctly")
    } catch (error) {
        // next(error)
        console.log(error)
    }
}

const getGenresFromDB = async (req, res, next) => {
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