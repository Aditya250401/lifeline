const pool = require('../pool')
const toCamelCase = require('./utils/to-camel-case')

class BloodGroupRepo {
	static async find() {
		const { rows } = await pool.query('SELECT * FROM blood_group;')
		return toCamelCase(rows)
	}

	static async findById(id) {
		const { rows } = await pool.query(
			'SELECT * FROM blood_group WHERE id = $1;',
			[id]
		)
		return toCamelCase(rows)[0]
	}

	static async findByGroupName(bloodGroupName) {
		const { rows } = await pool.query(
			'SELECT * FROM blood_group WHERE blood_group_name = $1;',
			[bloodGroupName]
		)
		return toCamelCase(rows)[0]
	}

	static async insert(bloodGroupName, unitsAvailable = 0) {
		const { rows } = await pool.query(
			'INSERT INTO blood_group (blood_group_name, units_available) VALUES ($1, $2) RETURNING *;',
			[bloodGroupName, unitsAvailable]
		)
		return toCamelCase(rows)[0]
	}

	static async updateUnitsAvailable(id, unitsAvailable) {
		const { rows } = await pool.query(
			'UPDATE blood_group SET units_available = $1 WHERE id = $2 RETURNING *;',
			[unitsAvailable, id]
		)
		return toCamelCase(rows)[0]
	}

	static async delete(id) {
		const { rows } = await pool.query(
			'DELETE FROM blood_group WHERE id = $1 RETURNING *;',
			[id]
		)
		return toCamelCase(rows)[0]
	}

	static async count() {
		const { rows } = await pool.query('SELECT COUNT(*) FROM blood_group;')
		return parseInt(rows[0].count)
	}
}

module.exports = BloodGroupRepo
