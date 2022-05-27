const axios = require("axios");
const {Videogame, Genre} = require("../db");
require('dotenv').config();
const {API_KEY} = process.env;

async function getVideogameByID (req, res, next) {
    const {id} = req.params
    let videogame
    try {
        videogame = (await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data
        videogame = {
            name: videogame.name,
            image: videogame.background_image,
            genres: videogame.genres.map(e => e.name),
            description: videogame.description,
            released: videogame.released,
            rating: videogame.rating,
            platforms: videogame.platforms.map(e => e.platform.name)
        }
        res.send(videogame)
    } catch (error) {
        try {
            videogame = await Videogame.findOne({
                where: {
                    id
                },
                include: Genre
            })
            videogame = {
                name: videogame.name,
                image: videogame.image,
                genres: videogame.genres.map(e => e.name),
                description: videogame.description,
                released: videogame.released,
                rating: videogame.rating,
                platforms: videogame.platforms.split(", ")
            }
            res.send(videogame)
        } catch (error) {
            // res.status(404).send(`No videogame found with id ${id}`)
            next(error)
        }
    }
}

async function postVideogame (req, res, next) {
    let {name, image, description, released, rating, genres, platforms} = req.body
    if (!name || !genres || !description || !platforms) return res.status(404).send("Some mandatory data is missing")
    if (released === "") released = null
    if (rating === "") rating = null
    platforms = platforms.join(", ")
    try {
        const newVideogame = await Videogame.create({name, image, description, released, rating, platforms})
        if (genres.length) {
            let arrPromises = genres.map(e => {
                return Genre.findOne({
                    where: {
                        name: e
                    }
                })
                .then(res => newVideogame.addGenre(res))
            })
            await Promise.all(arrPromises)
        }
        res.status(201).send("Videogame created correctly");
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getVideogameByID,
    postVideogame
}