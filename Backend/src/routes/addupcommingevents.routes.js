const express = require("express");
const router = express.Router();
const { addEvent } = require("../controllers/addupcommingevent.controller.js");
const { getEvent } = require("../controllers/getevent.controller.js");

router.get("/getevents", getEvent);
router.post('/newevent', addEvent);

module.exports = router;