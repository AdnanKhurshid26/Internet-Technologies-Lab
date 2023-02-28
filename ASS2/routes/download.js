const express = require('express');

const router = express.Router();

const downloadController = require('../controllers/download');
router.get('/download/:itemId',downloadController.getDownload);
router.get('/delete/:itemId',downloadController.getDelete);

// router.get('/delete/:itemId',downloadController.getDelete);

module.exports = router;