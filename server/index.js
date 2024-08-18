const app = require('./src/app')
const pool = require('./src/pool')

pool
	.connect({
		user: 'pc',
		password: 'alphaBeta25.',
		host: 'localhost',
		port: 5432, // default Postgres port
		database: 'lifeline',
	})
	.then(() => {
		app().listen(3005, () => {
			console.log('Server is listening on port 3005')
		})
	})
	.catch((err) => console.error(err))
