const express = require("express");
const app = express();
const cors = require("cors");

// Enable CORS for all routes
const allowedOrigins = [
  "http://localhost:5173",
  "https://college-club-data.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true
}));

//middleware
app.use(express.json());

// Import routes
const issueRoutes = require("./routes/issue.routes");
const adminRoutes = require("./routes/admin.routes");
const committeeRoutes = require("./routes/committee.routes");
const addupcommingEventsRoutes = require("./routes/addupcommingevents.routes");
const addAnnouncementRoutes = require("./routes/addannouncement.route");
const roleRoutes = require("./routes/role.routes");
const authRoutes = require("./routes/auth.routes");
const regularEventsRoutes = require("./routes/regularEvents.routes");


// Use routes
app.use("/api/issues", issueRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/committees", committeeRoutes);
app.use("/api/events", addupcommingEventsRoutes);
app.use("/api/announcements", addAnnouncementRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/regular-events", regularEventsRoutes);

module.exports = app;