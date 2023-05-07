const { Router } = require('express');
const router = Router();

const {
    getAnp,
    getAnpById,
    createUser,
    getUsers,
    verifyUser,
    sendEmail,
} = require('../controllers/index.controller')

router.get('/anp', getAnp)
router.post('/createUser', createUser)
router.get('/users', getUsers)
router.post('/verify', verifyUser);
router.get('/anp/:id', getAnpById);
router.post('/send-email', sendEmail)


module.exports = router;