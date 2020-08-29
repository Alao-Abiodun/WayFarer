const db = require('../db/index');
require('dotenv').config();

class TripController {
  async addTrip(req, res) {
    const {
      user_id,
      bus_id,
      origin,
      destination,
      trip_date,
      fare,
      status,
    } = req.body;
    const results = await db.query(
      'INSERT INTO trips (user_id, bus_id, origin, destination, trip_date, fare, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [user_id, bus_id, origin, destination, trip_date, fare, status]
    );
    console.log(results.rows[0]);
    return res.status(201).json({
      status: 'success',
      data: {
        trip_id: results.rows[0].tid,
        bus_id: results.rows[0].bus_id,
        origin: results.rows[0].origin,
        destination: results.rows[0].destination,
        trip_date: results.rows[0].trip_date,
        fare: results.rows[0].fare,
      },
    });
  }

  async fetchAllUserTrip(req, res) {
    // you were hashing an object that has this structure { user: Number }
    // where user points to the user id
    // you were destructuring id off of req.user, meanwhile req.user is itself the id you wanted
    const { user: id } = req.user;
    const results = await db.query(
      'SELECT trips.* FROM trips INNER JOIN users ON trips.user_id=users.id WHERE id=$1',
      [id]
    );
    return res.json({
      status: 'success',
      user_trip: results.rows.length,
      data: results.rows,
    });
  }
}

module.exports = new TripController();
