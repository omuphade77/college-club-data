const express = require("express");

const router = express.Router();

const { getRegularEvents, addRegularEvent } = require("../controllers/regularEvents.controller");
const { verifyStudentToken } = require("../middlewares/student.middleware"); 
const { verifyAdminToken } = require('../middlewares/auth.middleware');


router.get("/",  getRegularEvents);
router.post("/", addRegularEvent);

module.exports = router;