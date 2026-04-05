const { sql } = require("../db/db");
const getAnnouncements = async (req, res) => {
    try {
        const announcements = await sql`
        SELECT * FROM announcement
            ORDER BY id DESC;
        `;
        res.json(announcements);
    } catch (error) {
        console.error("Error fetching announcements:", error);
        res.status(500).json({ error: "Failed to fetch announcements" });
    }
};

module.exports = { getAnnouncements };