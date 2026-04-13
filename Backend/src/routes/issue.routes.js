const express = require("express");
const router = express.Router();
const { createIssue, getAllIssues } = require("../controllers/issue.contoller");
const { verifyStudentToken } = require("../middlewares/student.middleware"); 
   
router.post("/create", verifyStudentToken, createIssue);
router.get("/all", getAllIssues);

module.exports = router;