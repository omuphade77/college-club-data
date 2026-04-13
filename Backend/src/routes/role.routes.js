const express = require('express');
const router = express.Router();

const {
    createRoleRequest,
    getPendingRequests,
    approveRequest,
    rejectRequest,
    getMembers
} = require('../controllers/role.controller');
const { verifyStudentToken } = require('../middlewares/student.middleware');
const { verifyAdminToken } = require('../middlewares/auth.middleware');

router.post("/request", verifyStudentToken, createRoleRequest);
router.get("/pending", verifyAdminToken, getPendingRequests);
router.post("/approve/:id", verifyAdminToken, approveRequest);
router.post("/reject/:id", verifyAdminToken, rejectRequest);
router.get("/members", verifyStudentToken, getMembers);

module.exports = router;