/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(
			`
        CREATE TABLE IF NOT EXISTS blood_group (
        id SERIAL PRIMARY KEY,
        blood_group_name VARCHAR(3) NOT NULL,
        units_available INTEGER DEFAULT 0
      );`
		)
};

exports.down = pgm => {
    pgm.sql(
			`
      DROP TABLE IF EXISTS blood_group CASCADE;
    `
		)
};
