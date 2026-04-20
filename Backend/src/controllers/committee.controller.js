const { getCommitteeByName } = require('../services/committee.service');
const {sql} = require('../db/db.js');
const fetchCommitteeByName = async (req, res) => {
    try{
        const { committeename } = req.params;
        const committee = await getCommitteeByName(committeename);

        if(!committee) {
            return res.status(404).json({ message: 'Committee not found' });
        }
        res.status(200).json(committee);
    }
    catch (error){
        res.status(500).json({
            message: "Error fetching committee",
            error: error.message
        });
    }
    
    }

const getTotalMembers = async (req, res) => {
  try {
    const result = await sql`
      SELECT COUNT(*) FROM committee_members;
    `;

    res.json({ totalMembers: result[0].count });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch total members" });
  }
};

    module.exports = {
        fetchCommitteeByName,
        getTotalMembers
    };
