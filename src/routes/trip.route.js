const { Router } = require('express');

const router = Router();

const auth = require('../middleware/auth.middleware');

const { addTrip, fetchAllUserTrip } = require('../controller/trip.controller');

router.post('/', auth, addTrip);
router.get('/', auth, fetchAllUserTrip);

module.exports = router;
