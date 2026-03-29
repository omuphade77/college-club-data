const { getCommitteeByName } = require('../services/committee.service');

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

    module.exports = {
        fetchCommitteeByName
    };
