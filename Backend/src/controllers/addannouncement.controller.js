const { sql } = require("../db/db");

const addAnnouncement = async (req, res) => {
     const { announcement_description, committee_name } = req.body;
    try {
        const result = await sql`
            INSERT INTO announcement (announcement_description, committee_name)
            VALUES (${announcement_description}, ${committee_name})
            RETURNING *;
        `;
        res.status(201).json(result[0]);

    } catch (error) {
        console.error("Error adding announcement:", error);
        res.status(500).json({ error: "Failed to add announcement" });
    }
};

module.exports = { addAnnouncement };
