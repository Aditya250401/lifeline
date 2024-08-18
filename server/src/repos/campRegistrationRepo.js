const pool = require('../pool')
const toCamelCase = require('./utils/to-camel-case')

class CampRegistrationRepo {
	static async find() {
		try {
			const query = `
            SELECT 
                cr.id AS registration_id,
                cr.registration_date,
                cd.camp_name,
                cd.location,
                cd.units_donated,
                cd.date AS camp_date,
                cd.camp_manager_id,
                u.name AS camp_manager_username
            FROM 
                camp_registrations cr
            JOIN 
                camp_details cd ON cr.camp_id = cd.id
            JOIN 
                users u ON cd.camp_manager_id = u.id;
        `
			const { rows } = await pool.query(query)

			return toCamelCase(rows)
		} catch (error) {
			console.error('Error fetching camp registrations:', error)
			throw error // Rethrow the error for the caller to handle
		}
	}

	static async findById(id) {
		const { rows } = await pool.query(
			'SELECT * FROM camp_registrations WHERE id = $1;',
			[id]
		)
		return toCamelCase(rows)[0]
	}

	static async insert(
		campId,
		userId,
		registrationDate = new Date().toISOString().split('T')[0]
	) {
		const { rows } = await pool.query(
			'INSERT INTO camp_registrations (camp_id, user_id, registration_date) VALUES ($1, $2, $3) RETURNING *;',
			[campId, userId, registrationDate]
		)
		return toCamelCase(rows)[0]
	}

	static async delete(id) {
		const { rows } = await pool.query(
			'DELETE FROM camp_registrations WHERE id = $1 RETURNING *;',
			[id]
		)
		return toCamelCase(rows)[0]
	}

	static async count() {
		const { rows } = await pool.query(
			'SELECT COUNT(*) FROM camp_registrations;'
		)
		return parseInt(rows[0].count)
	}
}

module.exports = CampRegistrationRepo
