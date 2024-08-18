const CampRegistrationRepo = require('../repos/campRegistrationRepo')

const getAllCampRegistrations = async (req, res) => {
	try {
		console.log('reached here')
		const campRegistrations = await CampRegistrationRepo.find()
		console.log(campRegistrations)
		res.json(campRegistrations)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const getCampRegistrationById = async (req, res) => {
	const { id } = req.params
	try {
		const campRegistration = await CampRegistrationRepo.findById(id)
		if (!campRegistration) {
			return res.status(404).json({ message: 'Camp registration not found' })
		}
		res.json(campRegistration)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const createCampRegistration = async (req, res) => {
	const { campId, userId } = req.body
	try {
		const newCampRegistration = await CampRegistrationRepo.insert(
			campId,
			userId
		)
		res.status(201).json(newCampRegistration)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const deleteCampRegistration = async (req, res) => {
	const { id } = req.params
	try {
		const campRegistration = await CampRegistrationRepo.findById(id)
		if (!campRegistration) {
			return res.status(404).json({ message: 'Camp registration not found' })
		}
		await CampRegistrationRepo.delete(id)
		res.json({ message: 'Camp registration deleted' })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

module.exports = {
	getAllCampRegistrations,
	getCampRegistrationById,
	createCampRegistration,
	deleteCampRegistration,
}
