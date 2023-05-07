const { registerUsers, loginUsers, getUserDetails, resetPassword } = require('../../controllers/user/userController')
const { verifyToken } = require('../../middleware/Auth/authMiddleware')

const router = require('express').Router()


router.post('/', registerUsers)
router.post('/login',loginUsers)
router.post('/reset',resetPassword)
router.get('/test', verifyToken, getUserDetails)

module.exports=router