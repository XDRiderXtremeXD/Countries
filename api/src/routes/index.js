const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const Countries = require('./Controllers/Country')
const Activities = require('./Controllers/Activities')
router.use("/countries", Countries)
router.use("/activities", Activities)


module.exports = router;