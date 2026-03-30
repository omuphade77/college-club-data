const { sql } = require("../db/db");

const addEvent = async (req, res) => {
    const { event_name, event_date, event_description } = req.body;
    try {
        const newEvent = await sql`
            INSERT INTO events (event_name, event_date, event_description)
            VALUES (${event_name}, ${event_date}, ${event_description})
            RETURNING *;
        `;
        res.status(201).json(newEvent[0]);
    } catch (error) {
        console.error("Error adding event:", error);
        res.status(500).json({ error: "Failed to add event" });

    }
};

module.exports = { addEvent };