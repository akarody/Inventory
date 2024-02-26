const express = require('express');
const { uploadCSV } = require('../controllers/csvController');
const router = express.Router();
const multer = require('multer');



const upload = multer({ dest: "uploads/" });
router.post('/upload-csv', upload.single("csvFile"), uploadCSV);

module.exports = router;