const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');
router.get('/admin', adminController.getAdmin);
router.get('/adminlogin', adminController.getAdminLogin);
router.post('/adminlogin', adminController.postAdminLogin);

router.get('/admin/allfiles', adminController.getAllFiles);
router.get('/admin/users', adminController.getUsers);
router.get('/admin/users/:userid', adminController.getUserRepo);

module.exports = router;