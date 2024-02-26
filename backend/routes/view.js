const express = require('express');
const { viewCars } = require('../controllers/viewController');
const router = express.Router();



router.get('/cars', viewCars);

module.exports = router;