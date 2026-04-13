const express = require('express');
const router = express.Router();

const { fetchCommitteeByName } = require('../controllers/committee.controller');
const { verifyStudentToken } = require('../middlewares/student.middleware');
// Route to get committee by name
// dynamic route to fetch committee by name

router.get('/:committeename', verifyStudentToken, fetchCommitteeByName);

module.exports = router;