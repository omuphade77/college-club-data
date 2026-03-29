const { sql } = require("../db/db");

async function createIssue(req, res) {
  const { title, description } = req.body;
  try {
    const newIssue = await sql`
            INSERT INTO issue (issue_title, issue_text)
            VALUES (${title}, ${description})
            RETURNING *;
        `;
    res.status(201).json(newIssue[0]);
  } catch (error) {
    console.error("Error creating issue:", error);
    res.status(500).json({ error: "Failed to create issue" });
  }
}

async function getAllIssues(req, res) {
  try {
    const issues = await sql`
        SELECT * FROM issue ORDER BY created_at DESC;
        `;
    res.status(200).json(issues);
  } catch (error) {
    console.error("Error fetching issues:", error);
    res.status(500).json({ error: "Failed to fetch issues" });
  }
}

module.exports = { createIssue, getAllIssues };
