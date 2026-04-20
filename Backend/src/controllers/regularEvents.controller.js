const { sql } = require("../db/db");

const getRegularEvents = async (req, res) => {
  try {
    const events = await sql`
      SELECT * FROM regular_events
      ORDER BY event_name ASC;
    `;
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching regular events" });
  }
};

const addRegularEvent = async (req, res) => {
  const { event_name, committee_name } = req.body;

  try {
    const newEvent = await sql`
      INSERT INTO regular_events (event_name, committee_name)
      VALUES (${event_name}, ${committee_name})
      RETURNING *;
    `;
    res.json(newEvent[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding event" });
  }
};

module.exports = { getRegularEvents, addRegularEvent };