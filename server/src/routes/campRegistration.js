const express = require('express')
const router = express.Router()
const campRegistrationController = require('../controllers/campRegistrationControllers')

// Define routes
router.get('/', campRegistrationController.getAllCampRegistrations)
router.get('/:id', campRegistrationController.getCampRegistrationById)
router.post('/', campRegistrationController.createCampRegistration)
router.delete('/:id', campRegistrationController.deleteCampRegistration)

module.exports = router
