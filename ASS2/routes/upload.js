const express = require('express');

const router = express.Router();

const uploadController = require('../controllers/upload'); 

router.get('/upload',uploadController.getUpload);

router.post('/upload',uploadController.postUpload);

module.exports = router;