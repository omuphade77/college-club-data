const express = require('express');
const router = express.Router();

const {
    createRoleRequest,
    getPendingRequests,
    approveRequest,
    rejectRequest,
    getMembers
} = require('../controllers/role.controller');

router.post("/request", createRoleRequest);
router.get("/pending", getPendingRequests);
router.post("/approve/:id", approveRequest);
router.post("/reject/:id", rejectRequest);
router.get("/members", getMembers);

module.exports = router;