const { Router } = require('express');
const { getGenresFromDB } = require('../controllers/genreControllers');

const router = Router();

router.get("/", getGenresFromDB)

module.exports = router