require('dotenv').config()
require('express-async-errors')
// express

const express = require('express')
const app = express()
// rest of the packages
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')

// middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const usersRouter = require('./routes/users')
const bloodGroupRouter = require('./routes/bloodGroup')
const campDetailRouter = require('./routes/camp_detail')
const campRegistrationRouter = require('./routes/campRegistration')

module.exports = () => {
	const app = express()

	app.use(morgan('dev'))

	app.set('trust proxy', 1)

	app.use(helmet())
	app.use(
		cors({
			origin: 'http://localhost:3000',
			credentials: true, // Allow credentials
		})
	)
	app.use(xss())

	app.use(express.json())
	app.use(cookieParser(process.env.JWT_SECRET))
	app.options(
		'*',
		cors({
			origin: 'http://localhost:3000',
			credentials: true,
		})
	)

	app.use('/api/user', usersRouter)
	app.use('/api/bloodgroup', bloodGroupRouter)
	app.use('/api/camp', campDetailRouter)
	app.use('/api/campRegistration', campRegistrationRouter)


	app.use(notFoundMiddleware)
	app.use(errorHandlerMiddleware)

	return app
}
