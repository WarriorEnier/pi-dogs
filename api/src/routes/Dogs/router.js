const {Router} = require('express');
const router = Router();

const {getDogsApi, postDogs} = require('./controller')

router.get('/', getDogsApi);
router.get('/:id', getDogsApi);
router.post('/', postDogs);

module.exports = router;