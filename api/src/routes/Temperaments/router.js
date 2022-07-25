const {Router} = require('express')
const router = Router();
const {getTemperamentResult} = require('./controller');

router.get('/', getTemperamentResult);


module.exports = router;