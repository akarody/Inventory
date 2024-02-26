const express = require('express');
const { updateInventory } = require('../controllers/updateController');
const router = express.Router();



router.put('/update-inventory', updateInventory);

module.exports = router;