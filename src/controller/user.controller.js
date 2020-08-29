const db = require('../db/index');
require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { JWT_SECRET } = process.env;

class UserController {
  async getUsers(req, res) {
    try {
      const results = await db.query('SELECT * FROM users');
      console.log(results.rows);
      return res.json({
        status: 'success',
        results: results.rows.length,
        data: results.rows,
      });
    } catch (error) {
      console.log(err);
    }
  }

  async getSingleUsers(req, res) {
    try {
      const { id } = req.params;
      const results = await db.query('SELECT * FROM users WHERE id = $1', [id]);
      console.log(results.rows[0]);
      return res.json({
        status: 'success',
        data: results.rows[0],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async addUsers(req, res) {
    try {
      const { email, firstname, lastname, password, is_admin } = req.body;
      const hashPassword = await bcrypt.hash(password, 8);
      const results = await db.query(
        'INSERT INTO users (email, firstname, lastname, password, is_admin) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [email, firstname, lastname, hashPassword, is_admin]
      );
      const token = await jwt.sign({ user: results.rows[0].id }, JWT_SECRET, {
        expiresIn: '1day',
      });
      console.log(results);
      return res.status(201).json({
        status: 'success',
        data: {
          user_id: results.rows[0].id,
          is_admin: results.rows[0].is_admin,
          token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.json({
          status: 'error',
          error: 'Please fill in the required field',
        });
      const results = await db.query(
        'SELECT * FROM users WHERE email = $1 AND password = $2',
        [email, password]
      );

      const token = await jwt.sign({ user: results.rows[0].id }, JWT_SECRET, {
        expiresIn: '1day',
      });
      if (results.rows.length < 0) {
        return res.json({
          status: 'error',
          error: 'User does not exist or check your password correctly',
        });
      }
      return res.json({
        status: 'success',
        data: {
          user_id: results.rows[0].id,
          is_admin: results.rows[0].is_admin,
          token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserController();
