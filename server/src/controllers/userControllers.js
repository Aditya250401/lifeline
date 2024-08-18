const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const {
	createTokenUser,
	attachCookiesToResponse,
	checkPermissions,
} = require('../utils')
const UserRepo = require('../repos/user-repo')

const getAllUsers = async (req, res) => {
	try {
		const users = await UserRepo.find()
		res.status(StatusCodes.OK).json({ users })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const getUser = async (req, res) => {
	try {
		const { id } = req.params
		const user = await UserRepo.findById(id)

		if (user) {
			//checkPermissions(req.user, user.id)
			res.status(StatusCodes.OK).json({ user })
		} else {
			res.sendStatus(404)
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const updateUser = async (req, res) => {
	try {
		const { id } = req.params

		const {
			name,
			bloodGroup,
			email,
			city,
			contactNumber,
			anyPrevDisease,
			prevMedicalHistory,
			lastBloodDonated,
			isAdmin,
			isCampManager,
		} = req.body

		//lastBloodDonated is a string, convert it to a Date object
		const lastBloodDonatedDate = new Date(lastBloodDonated)

		const user = await UserRepo.update(
			id,
			name,
			bloodGroup,
			email,
			city,
			contactNumber,
			anyPrevDisease,
			prevMedicalHistory,
			lastBloodDonatedDate,
			isAdmin,
			isCampManager
		)
		const tokenUser = createTokenUser(user)

		attachCookiesToResponse({ res, user: tokenUser })

		res.status(StatusCodes.OK).json({ user: tokenUser })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const updateDonationStatus = async (req, res) => {
	try {
		const { id } = req.params

		const user = await UserRepo.updateBloodDonationDetails(id)

		if (user) {
			res.status(StatusCodes.OK).json({ user })
		} else {
			res.sendStatus(404)
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const deleteUser = async (req, res) => {
	try {
		const { id } = req.params
		const user = await UserRepo.delete(id)

		if (user) {
			res.send(user)
		} else {
			res.sendStatus(404)
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

module.exports = {
	getAllUsers,
	getUser,
	updateUser,
	updateDonationStatus,
	deleteUser,
}
