/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
     CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        blood_group VARCHAR(3) ,
		   email VARCHAR(100) NOT NULL UNIQUE,
		   password VARCHAR(100) NOT NULL,
        city VARCHAR(100) ,
        contact_number VARCHAR(20) ,
        any_prev_disease BOOLEAN DEFAULT FALSE,
        prev_medical_history TEXT,
        last_blood_donated DATE DEFAULT NULL,
        is_admin BOOLEAN DEFAULT FALSE,
        is_camp_manager BOOLEAN DEFAULT FALSE
      );
    `)
};

exports.down = pgm => {
    pgm.sql(`
      DROP TABLE IF EXISTS users CASCADE;
    `)
};
