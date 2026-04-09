const { sql } = require("../db/db");
const getEvent = async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const upcomingevents = await sql`
        SELECT * FROM events
        WHERE event_date >= ${today}
        ORDER BY event_date ASC;
        `;

        const pastevents = await sql`
        SELECT * FROM events
        WHERE event_date < ${today}
        ORDER BY event_date DESC;
        `;
        res.json({ upcoming: upcomingevents, past: pastevents });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching events" });
    }
};

module.exports = { getEvent };

