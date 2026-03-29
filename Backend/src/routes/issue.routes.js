const express = require("express");
const router = express.Router();
const { createIssue, getAllIssues } = require("../controllers/issue.contoller");

router.post("/create", createIssue);
router.get("/all", getAllIssues);

module.exports = router;