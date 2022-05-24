const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videogameRoutes = require("./videogameRoutes")
const genreRoutes = require("./genreRoutes")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const router = Router();

router.use("/videogames", videogameRoutes)
router.use("/genres", genreRoutes)

module.exports = router;
