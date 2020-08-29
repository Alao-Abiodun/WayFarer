const express = require('express');
const router = express.Router();

const userRoute = require('../routes/user.route');
const tripRoute = require('../routes/trip.route');

router.use('/users', userRoute);
router.use('/trips', tripRoute);

module.exports = router;
