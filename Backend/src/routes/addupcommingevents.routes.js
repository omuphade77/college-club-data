const express = require("express");
const router = express.Router();
const { addEvent } = require("../controllers/addupcommingevent.controller.js");
router.post('/newevent', addEvent);

module.exports = router;