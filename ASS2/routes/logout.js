const express = require('express');

const router = express.Router();

const logoutController = require('../controllers/logout'); 

router.use('/logout',logoutController.getLogin);

module.exports = router;