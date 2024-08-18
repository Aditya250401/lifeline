/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
	pgm.sql(`
    CREATE TABLE IF NOT EXISTS camp_details (
        id SERIAL PRIMARY KEY,
        camp_name VARCHAR(255),
        location VARCHAR(255) NOT NULL,
        units_donated INTEGER DEFAULT 0,
        date DATE NOT NULL,
        camp_manager_id INTEGER REFERENCES users(id)
        );`)
}

exports.down = (pgm) => {
	pgm.sql(`
      DROP TABLE IF EXISTS camp_details CASCADE;
    `)
}
