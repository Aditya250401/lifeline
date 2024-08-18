/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
      CREATE TABLE IF NOT EXISTS donation_details (
        id SERIAL PRIMARY KEY,
        camp_id INTEGER REFERENCES camp_details(id),
        donor_id INTEGER REFERENCES users(id),
        date_of_donation DATE,
        blood_group_id INTEGER REFERENCES blood_group(id)
      );`)
};

exports.down = pgm => {
    pgm.sql(`
      DROP TABLE IF EXISTS donation_details CASCADE;
    `)
};
