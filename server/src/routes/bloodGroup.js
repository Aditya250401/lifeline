const express = require('express')
const router = express.Router()
const bloodGroupController = require('../controllers/bloodGroupControllers')

// Define routes
router.get('/', bloodGroupController.getAllBloodGroups)
router.get('/:id', bloodGroupController.getBloodGroupById)
router.post('/', bloodGroupController.createBloodGroup)
router.put('/:id', bloodGroupController.updateBloodGroupUnitsAvailable)
router.delete('/:id', bloodGroupController.deleteBloodGroup)

module.exports = router
