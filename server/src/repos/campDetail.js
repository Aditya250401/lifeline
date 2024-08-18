const pool = require('../pool')
const toCamelCase = require('./utils/to-camel-case')

class CampRepo {
	static async find() {
		const { rows } = await pool.query('SELECT * FROM camp_details;')
		return toCamelCase(rows)
	}

	static async findById(id) {
		const { rows } = await pool.query(
			'SELECT * FROM camp_details WHERE id = $1;',
			[id]
		)
		return toCamelCase(rows)[0]
	}

	static async insert(campName, location, date, campManagerId) {
		const { rows } = await pool.query(
			'INSERT INTO camp_details (camp_name, location, date, camp_manager_id) VALUES ($1, $2, $3, $4) RETURNING *;',
			[campName, location, date, campManagerId]
		)
		return toCamelCase(rows)[0]
	}

	static async updateUnitsDonated(id) {
		const { rows } = await pool.query(
			'UPDATE camp_details SET units_donated = (select units_donated from camp_details where id = $1) + 1  WHERE id = $1 RETURNING *;',
			[id]
		)
		return toCamelCase(rows)[0]
	}

	static async delete(id) {
		const { rows } = await pool.query(
			'DELETE FROM camp_details WHERE id = $1 RETURNING *;',
			[id]
		)
		return toCamelCase(rows)[0]
	}

	static async count() {
		const { rows } = await pool.query('SELECT COUNT(*) FROM camp_details;')
		return parseInt(rows[0].count)
	}
}

module.exports = CampRepo
