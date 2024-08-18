/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
	pgm.sql(`
    CREATE TABLE IF NOT EXISTS camp_registrations (
    id SERIAL PRIMARY KEY,
    camp_id INTEGER REFERENCES camp_details(id),
    user_id INTEGER REFERENCES users(id),
    registration_date DATE DEFAULT CURRENT_DATE);
    `)
}

exports.down = (pgm) => {
	pgm.sql(`
      DROP TABLE IF EXISTS camp_registrations CASCADE;
    `)
}
