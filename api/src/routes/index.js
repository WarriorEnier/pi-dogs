const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogs = require('./Dogs/router')
const temp = require('./Temperaments/router')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
router.use('/dogs', dogs);
router.use('/temp', temp);

