const CampRepo = require('../repos/campDetail')

const getAllCamps = async (req, res) => {
	try {
		const camps = await CampRepo.find()
		res.json(camps)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const getCampById = async (req, res) => {
	const { id } = req.params
	try {
		const camp = await CampRepo.findById(id)
		if (!camp) {
			return res.status(404).json({ message: 'Camp not found' })
		}
		res.json(camp)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const createCamp = async (req, res) => {
	const { campName, location, date, campManagerId } = req.body
	try {
		const newCamp = await CampRepo.insert(
			campName,
			location,
			date,
			campManagerId
		)
		res.status(201).json(newCamp)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const updateCampUnitsDonated = async (req, res) => {
	const { id } = req.params
	const { unitsDonated } = req.body
	try {
		const camp = await CampRepo.findById(id)
		if (!camp) {
			return res.status(404).json({ message: 'Camp not found' })
		}
		const updatedCamp = await CampRepo.updateUnitsDonated(id, unitsDonated)
		res.json(updatedCamp)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const deleteCamp = async (req, res) => {
	const { id } = req.params
	try {
		const camp = await CampRepo.findById(id)
		if (!camp) {
			return res.status(404).json({ message: 'Camp not found' })
		}
		await CampRepo.delete(id)
		res.json({ message: 'Camp deleted' })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

module.exports = {
	getAllCamps,
	getCampById,
	createCamp,
	updateCampUnitsDonated,
	deleteCamp,
}
