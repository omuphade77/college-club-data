const { sql } = require("../db/db");
const getEvent = async (req, res) => {
    try {
        const events = await sql`
        SELECT * FROM events
        ORDER BY event_date ASC;
        `;
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching events" });
    }
};

module.exports = { getEvent };

