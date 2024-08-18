const express = require('express')
const router = express.Router()

const {
	authenticateUser,
	authorizePermissions,
} = require('../middleware/authentication')

const {
	register,
	login,
	logout,
	cookieChecker,
} = require('../controllers/authControllers')
const {
	getAllUsers,
	getUser,
	updateUser,
	deleteUser,
	updateDonationStatus,
} = require('../controllers/userControllers')
const cookieParser = require('cookie-parser')

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/auth/cookieChecker', cookieChecker)
router.get('/getAllUsers', getAllUsers)
router.route('/getUser/:id').get(getUser)
router.route('/UpdateUser/:id').patch(updateUser)
router.route('/updateDonationStatus/:id').patch(updateDonationStatus)
router.route('/delete/:id').delete(deleteUser)

module.exports = router
