const express = require('express');

const router = express.Router();

const mySignController = require('../controllers/signup'); 

router.get('/signup',mySignController.getSignup);

router.post('/signup',mySignController.postSignup);

module.exports = router;