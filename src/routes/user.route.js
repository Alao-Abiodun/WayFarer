const express = require('express');
const router = express.Router();

// const auth = require('../middleware/auth.middleware');

const {
  getUsers,
  getSingleUsers,
  addUsers,
  loginUser,
} = require('../controller/user.controller');

router.get('/', getUsers);
router.get('/:id', getSingleUsers);
router.post('/auth/signup', addUsers);
router.post('/auth/signin', loginUser);

module.exports = router;
