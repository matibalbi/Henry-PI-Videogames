const { Router } = require('express');
const { getVideogameByID, postVideogame, putVideogame, deleteVideogame } = require('../controllers/videogameControllers');

const router = Router();

router.get("/:id", getVideogameByID)

router.post("/", postVideogame)

router.put("/:id/update", putVideogame)

router.delete("/:id/delete", deleteVideogame)

module.exports = router