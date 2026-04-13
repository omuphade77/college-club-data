
const express = require('express');
const router = express.Router();
const { addAnnouncement } = require('../controllers/addannouncement.controller');
const { getAnnouncements } = require('../controllers/getannouncements.controller');
const { verifyStudentToken } = require('../middlewares/student.middleware');
const { verifyAdminToken } = require('../middlewares/auth.middleware');

router.get('/getannouncements', verifyStudentToken, getAnnouncements);  
router.post('/addnewannouncement', verifyAdminToken, addAnnouncement);
module.exports = router;