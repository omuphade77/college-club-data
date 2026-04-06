const express = require("express");
const app = express();
const cors = require("cors");

// Enable CORS for all routes
app.use(cors());
//middleware
app.use(express.json());

// Import routes
const issueRoutes = require("./routes/issue.routes");
const adminRoutes = require("./routes/admin.routes");
const committeeRoutes = require("./routes/committee.routes");
const addupcommingEventsRoutes = require("./routes/addupcommingevents.routes");
const addAnnouncementRoutes = require("./routes/addannouncement.route");
const roleRoutes = require("./routes/role.routes");

// Use routes
app.use("/api/issues", issueRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/committees", committeeRoutes);
app.use("/api/events", addupcommingEventsRoutes);
app.use("/api/announcements", addAnnouncementRoutes);
app.use("/api/roles", roleRoutes);


module.exports = app;