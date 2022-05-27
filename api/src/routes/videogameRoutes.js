const { Router } = require('express');
const { getVideogameByID, postVideogame } = require('../controllers/videogameControllers');

const router = Router();

router.get("/:id", getVideogameByID)

router.post("/", postVideogame)

module.exports = router