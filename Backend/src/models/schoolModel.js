const pool = require('../config/db');

class SchoolModel {
  static async addSchool(name, address, latitude, longitude) {
    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    await pool.execute(query, [name, address, latitude, longitude]);
  }

  static async getAllSchools() {
    const [rows] = await pool.execute('SELECT * FROM schools');
    return rows;
  }
}

module.exports = SchoolModel;
