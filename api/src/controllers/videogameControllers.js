const axios = require("axios");
const {Videogame, Genre} = require("../db");
require('dotenv').config();
const {API_KEY} = process.env;

const getVideogameByID = async (req, res, next) => {

    const {id} = req.params

    if (id.length === 36) {
        try {
            let videogame = await Videogame.findOne({where: {id}, include: Genre})
            videogame = {
                id: videogame.id,
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
            next(error)
        }
    }
    else {
        try {
            let videogame = (await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data
            
            if (videogame.id) {
                videogame = {
                    id: videogame.id,
                    name: videogame.name,
                    image: videogame.background_image,
                    genres: videogame.genres.map(e => e.name),
                    description: videogame.description,
                    released: videogame.released,
                    rating: videogame.rating,
                    platforms: videogame.platforms.map(e => e.platform.name)
                }
            }
            res.send(videogame)
        } catch (error) {
            res.send({error: "No videogame found with that ID"})
        }
    }
}

const postVideogame = async (req, res, next) => {

    let {name, image, description, released, rating, genres, platforms} = req.body

    if (!name || !genres || !description || !platforms) return res.status(404).send("Some mandatory data is missing")
    if (released === "") released = null
    if (rating === "") rating = null
    platforms = platforms.join(", ")

    try {
        const newVideogame = await Videogame.create({name, image, description, released, rating, platforms})
        let arrPromises = genres.map(e => (
            Genre.findOne({where: {name: e}})
            .then(res => newVideogame.addGenre(res))
        ))
        await Promise.all(arrPromises)
        res.status(201).send("Videogame created correctly");
    } catch (error) {
        next(error)
    }
}

const putVideogame = async (req, res, next) => {

    const {id} = req.params
    let {name, image, description, released, rating, genres, platforms} = req.body
    if (released === "") released = null
    if (rating === "") rating = null
    platforms = platforms.join(", ")

    try {
        const videogame = await Videogame.findByPk(id)
        const update = await videogame.update(
            {name, image, description, released, rating, platforms},
            )
        const videogameGenres = await videogame.getGenres()
        await videogame.removeGenres(videogameGenres)
        let arrPromises = genres.map(e => (
            Genre.findOne({where: {name: e}})
            .then(res => videogame.addGenre(res))
        ))
        await Promise.all(arrPromises)
        res.status(201).send("Videogame updated correctly");
    } catch (error) {
        next(error)
    }
}

const deleteVideogame = async (req, res, next) => {

    const {id} = req.params

    try {
        let videogame = await Videogame.findByPk(id)
        videogame.destroy()
        res.status(201).send("Videogame deleted correctly");
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getVideogameByID,
    postVideogame,
    putVideogame,
    deleteVideogame
}