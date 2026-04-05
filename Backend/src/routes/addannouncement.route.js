
const express = require('express');
const router = express.Router();
const { addAnnouncement } = require('../controllers/addannouncement.controller');
const { getAnnouncements } = require('../controllers/getannouncements.controller');

router.get('/getannouncements', getAnnouncements);  
router.post('/addnewannouncement', addAnnouncement);
module.exports = router;