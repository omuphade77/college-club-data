const express = require('express');
const router = express.Router();

const { fetchCommitteeByName } = require('../controllers/committee.controller');

// Route to get committee by name
// dynamic route to fetch committee by name
router.get('/:committeename', fetchCommitteeByName);

module.exports = router;