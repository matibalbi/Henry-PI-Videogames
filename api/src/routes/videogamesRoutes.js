const { Router } = require('express');
const { getVideogames } = require('../controllers/videogamesControllers');

const router = Router();

router.get("/", getVideogames)

module.exports = router