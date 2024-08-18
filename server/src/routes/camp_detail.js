const express = require('express')
const router = express.Router()
const campController = require('../controllers/campControllers')

// Define routes
router.get('/', campController.getAllCamps)
router.get('/:id', campController.getCampById)
router.post('/', campController.createCamp)
router.put('/:id', campController.updateCampUnitsDonated)
router.delete('/:id', campController.deleteCamp)

module.exports = router
