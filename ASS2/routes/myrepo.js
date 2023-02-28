const express = require('express');

const router = express.Router();

const myrepoController = require('../controllers/myrepo'); 


router.use('/myrepo',myrepoController.getMyRepo);

module.exports = router;