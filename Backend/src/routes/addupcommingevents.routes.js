const express = require("express");
const router = express.Router();
const { addEvent } = require("../controllers/addupcommingevent.controller.js");
const { getEvent } = require("../controllers/getevent.controller.js");
const { verifyStudentToken } = require('../middlewares/student.middleware');
const { verifyAdminToken } = require('../middlewares/auth.middleware');

router.get("/getevents", verifyStudentToken, getEvent);
router.post('/newevent', verifyAdminToken, addEvent);

module.exports = router;