const BloodGroupRepo = require('../repos/bloodGroup-repo')

// Controller functions
const getAllBloodGroups = async (req, res) => {
	try {
		const bloodGroups = await BloodGroupRepo.find()
		res.json(bloodGroups)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const getBloodGroupById = async (req, res) => {
	const { id } = req.params
	try {
		const bloodGroup = await BloodGroupRepo.findById(id)
		if (!bloodGroup) {
			return res.status(404).json({ message: 'Blood group not found' })
		}
		res.json(bloodGroup)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const createBloodGroup = async (req, res) => {
	const { bloodGroupName, unitsAvailable } = req.body
	try {
		const newBloodGroup = await BloodGroupRepo.insert(
			bloodGroupName,
			unitsAvailable
		)
		res.status(201).json(newBloodGroup)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const updateBloodGroupUnitsAvailable = async (req, res) => {
	const { id } = req.params
	const { unitsAvailable } = req.body
	try {
		const bloodGroup = await BloodGroupRepo.findById(id)
		if (!bloodGroup) {
			return res.status(404).json({ message: 'Blood group not found' })
		}
		const updatedBloodGroup = await BloodGroupRepo.updateUnitsAvailable(
			id,
			unitsAvailable
		)
		res.json(updatedBloodGroup)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const deleteBloodGroup = async (req, res) => {
	const { id } = req.params
	try {
		const bloodGroup = await BloodGroupRepo.findById(id)
		if (!bloodGroup) {
			return res.status(404).json({ message: 'Blood group not found' })
		}
		await BloodGroupRepo.delete(id)
		res.json({ message: 'Blood group deleted' })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

module.exports = {
	getAllBloodGroups,
	getBloodGroupById,
	createBloodGroup,
	updateBloodGroupUnitsAvailable,
	deleteBloodGroup,
}
