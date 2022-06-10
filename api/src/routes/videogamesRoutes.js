const { Router } = require('express');
const { getVideogames, getVideogamesfromDB, getVideogamesFromAPI } = require('../controllers/videogamesControllers');

const router = Router();

router.get("/", getVideogames)

router.get("/db", getVideogamesfromDB)

router.get("/api", getVideogamesFromAPI)

module.exports = router