const { Router } = require('express');
const { getAllVideogames } = require('../controllers/videogameControllers');

const router = Router();
router.use("/", getAllVideogames)

module.exports = router