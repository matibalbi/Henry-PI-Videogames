const { Router } = require('express');
const { getVideogames, getVideogameByID, postVideogame } = require('../controllers/videogameControllers');

const router = Router();

router.get("/", getVideogames)

router.get("/:id", getVideogameByID)

router.post("/", postVideogame)

module.exports = router