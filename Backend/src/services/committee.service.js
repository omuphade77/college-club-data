const {sql} = require('../db/db');

// get committee by name
const getCommitteeByName = async (name) => {
    try {
        const committee = await sql`
            SELECT * FROM committees 
            WHERE LOWER(committee_name) = LOWER(${name})
        `;
        return committee[0]; // Return the first matching committee
    } catch (error) {
        console.error('Error fetching committee by name:', error);
        throw error;
    }

};


module.exports = {
    getCommitteeByName
};