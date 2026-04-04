
const express = require('express');
const router = express.Router();
const { addAnnouncement } = require('../controllers/addannouncement.controller');

router.post('/addnewannouncement', addAnnouncement);
module.exports = router;