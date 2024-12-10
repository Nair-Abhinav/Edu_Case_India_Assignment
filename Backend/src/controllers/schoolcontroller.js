const SchoolModel = require('../models/schoolModel');
const haversine = require('../utils/haversine');

class SchoolController {
  static async addSchool(req, res) {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      await SchoolModel.addSchool(name, address, parseFloat(latitude), parseFloat(longitude));
      res.status(201).json({ message: 'School added successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }

  static async listSchools(req, res) {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'User latitude and longitude are required.' });
    }

    try {
      const schools = await SchoolModel.getAllSchools();
      const userLat = parseFloat(latitude);
      const userLon = parseFloat(longitude);

      const sortedSchools = schools.map((school) => ({
        ...school,
        distance: haversine(userLat, userLon, school.latitude, school.longitude),
      })).sort((a, b) => a.distance - b.distance);

      res.json(sortedSchools);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
}

module.exports = SchoolController;
