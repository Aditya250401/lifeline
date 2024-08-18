const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { attachCookiesToResponse, createTokenUser } = require('../utils')
const UserRepo = require('../repos/user-repo')
const { isTokenValid } = require('../utils')

const register = async (req, res) => {
	try {
		const { name, email, password } = req.body

		const existingUser = await UserRepo.findByEmail(email)

		if (existingUser) {
			return res.status(400).send('User with this email already exists.')
		}

		const user = await UserRepo.insert(name, email, password)
		console.log(user)

		const tokenUser = createTokenUser(user)

		attachCookiesToResponse({ res, user: tokenUser })

		res.status(StatusCodes.CREATED).json({ user: tokenUser })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const login = async (req, res) => {
	try {
		const { email, password } = req.body
		console.log(email, 'and', password)

		if (!email || !password) {
			throw new CustomError.BadRequestError('Please provide email and password')
		}

		const user = await UserRepo.authenticate(email, password)
		console.log('this is authnticated user', user)

		if (!user) {
			throw new CustomError.UnauthenticatedError('Invalid Credentials')
		}

		const tokenUser = createTokenUser(user)
		attachCookiesToResponse({ res, user: tokenUser })

		res.status(StatusCodes.OK).json({ user: tokenUser })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const cookieChecker = async (req, res) => {
	const token = req.signedCookies.token
	if (!token) {
		throw new CustomError.UnauthenticatedError(
			'Authentication invalid no token'
		)
	}
	const { username, id, email } = isTokenValid({ token })
	const user = await UserRepo.findByEmail(email)

	if (!user) {
		throw new CustomError.UnauthenticatedError(
			'something went wrong please login again'
		)
	}
	console.log(user)
	res.status(StatusCodes.OK).json({ user })
}

const logout = async (req, res) => {
	res.cookie('token', 'logout', {
		httpOnly: true,
		expires: new Date(Date.now() + 1000),
	})
	res.status(StatusCodes.OK).json({ msg: 'user logged out!' })
}

module.exports = {
	register,
	login,
	logout,
	cookieChecker,
}
