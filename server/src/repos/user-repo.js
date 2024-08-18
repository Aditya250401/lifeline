const pool = require('../pool')
const toCamelCase = require('./utils/to-camel-case')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class UserRepo {
	static async find() {
		const { rows } = await pool.query('SELECT * FROM users;')
		return toCamelCase(rows)
	}

	static async findById(id) {
		const { rows } = await pool.query('SELECT * FROM users WHERE id = $1;', [
			id,
		])
		return toCamelCase(rows)[0]
	}

	static async findByEmail(email) {
		const { rows } = await pool.query('SELECT * FROM users WHERE email = $1;', [
			email,
		])
		return toCamelCase(rows)[0]
	}

	static async insert(name, email, password) {
		const hashedPassword = await bcrypt.hash(password, 10)
		const { rows } = await pool.query(
			'INSERT INTO users (name,  email, password) VALUES ($1, $2, $3) RETURNING *;',
			[name, email, hashedPassword]
		)
		return toCamelCase(rows)[0]
	}

	static async authenticate(email, password) {
		const user = await this.findByEmail(email)
		return user
		console.log('here is the user', user)
		if (!user) return null
		//const isValidPassword = await bcrypt.compare(password, user.password)
		return isValidPassword ? user : null
	}

	static async update(
		id,
		name,
		bloodGroup,
		email,
		city,
		contactNumber,
		anyPrevDisease,
		prevMedicalHistory,
		lastBloodDonated,
		isAdmin,
		isCampManager
	) {
		const { rows } = await pool.query(
			'UPDATE users SET name = $1, blood_group = $2, email = $3, city = $4, contact_number = $5, any_prev_disease = $6, prev_medical_history = $7, last_blood_donated = $8, is_admin = $9, is_camp_manager = $10 WHERE id = $11 RETURNING *;',
			[
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
				id,
			]
		)
		return toCamelCase(rows)[0]
	}

	static async updateBloodDonationDetails(id) {
		const currentDate = new Date().toISOString().split('T')[0] // Get current date in YYYY-MM-DD format
		const { rows } = await pool.query(
			'UPDATE users SET last_blood_donated = $1 WHERE id = $2 RETURNING *;',
			[currentDate, id]
		)
		return toCamelCase(rows)[0]
	}

	static async makeUserAdmin(id) {
		const { rows } = await pool.query(
			'UPDATE users SET is_admin = TRUE WHERE id = $1 RETURNING *;',
			[id]
		)
		return toCamelCase(rows)[0]
	}

	static async delete(id) {
		const { rows } = await pool.query(
			'DELETE FROM users WHERE id = $1 RETURNING *;',
			[id]
		)
		return toCamelCase(rows)[0]
	}

	static async count() {
		const { rows } = await pool.query('SELECT COUNT(*) FROM users;')
		return parseInt(rows[0].count)
	}
}

module.exports = UserRepo
