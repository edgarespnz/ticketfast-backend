const {Router} = require('express');
const router = Router();

const {getAnp , createUser, getUsers, verifyUser} = require('../controllers/index.controller')

router.get('/anp', getAnp)
router.post('/createUser',createUser)
router.get('/users',getUsers)
router.post('/verify', verifyUser);



module.exports = router;