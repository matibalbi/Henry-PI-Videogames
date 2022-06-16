const axios = require("axios");
const {Genre} = require("../db");
require('dotenv').config();
const {API_KEY} = process.env;

const getAllGenres = async () => {
    try {
        let genres = (await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results.map(e => ({id: e.id, name: e.name}))
        // await Genre.bulkCreate(genres)
        let arrPromises = genres.map(e => (
            Genre.findOrCreate({where: {id: e.id, name: e.name}})
        ))
        await Promise.all(arrPromises)
        console.log("Genres loaded in DB correctly")
    } catch (error) {
        console.log(error.message)
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