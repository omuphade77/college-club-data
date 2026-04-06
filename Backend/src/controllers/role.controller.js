const { sql } = require('../db/db');

// 1. USER SUBMIT
async function createRoleRequest(req, res) {
    const { name, mobile, email, branch, role, committee_name, year } = req.body;

    try {
        const result = await sql `
            INSERT INTO role_requests (name, mobile, email, branch, role, committee_name, year)
            VALUES (${name}, ${mobile}, ${email}, ${branch}, ${role}, ${committee_name}, ${year})
            RETURNING *`;

        res.status(201).json({ message: 'Role request created successfully', data: result[0] });
    } catch (error) {
        console.error('Error creating role request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// 2. GET PENDING (ADMIN)
async function getPendingRequests(req, res) {
    try {
        const result = await sql `SELECT * FROM role_requests WHERE status = 'pending'`;
        res.status(200).json({ data: result });
    } catch (error) {
        console.error('Error fetching pending requests:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// 3. APPROVE(ADMIN)

async function approveRequest(req, res) {
    const { id } = req.params;
    try {
        const result = await sql `
        SELECT * FROM role_requests WHERE id=${id};
        `;

        const user = result[0];

        await sql `
        INSERT INTO committee_members 
            (name, mobile, email, branch, role, committee_name, year)
            VALUES (${user.name}, ${user.mobile}, ${user.email}, ${user.branch}, ${user.role}, ${user.committee_name}, ${user.year});
        `;

        await sql `
        UPDATE role_requests SET status='approved' WHERE id=${id};
        `;

        res.status(200).json({ message: 'Request approved successfully' });
    } catch (error) {
        console.error('Error approving request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// 4. REJECT(ADMIN)
async function rejectRequest(req, res) {
    const { id } = req.params;
    try {
        await sql `
        UPDATE role_requests SET status='rejected' WHERE id=${id};
        `;
        res.status(200).json({ message: 'Request rejected successfully' });
    } catch (error) {
        console.error('Error rejecting request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


// 5. GET APPROVED MEMBERS
async function getMembers(req, res) {
    try {
        const result = await sql `SELECT * FROM committee_members`;
        res.status(200).json({ data: result });
    } catch (error) {
        console.error('Error fetching committee members:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}




module.exports = {
    createRoleRequest,
    getPendingRequests,
    approveRequest,
    rejectRequest,
    getMembers
};


