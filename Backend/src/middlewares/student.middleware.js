const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

const verifyStudentToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // ❌ No header
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }

        // ❌ Wrong format
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Invalid token format" });
        }

        // ✅ Extract token
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Token missing" });
        }

        // ✅ Verify
        const decoded = jwt.verify(token, JWT_SECRET);

        // ✅ Attach user
        req.user = decoded;

        next();

    } catch (error) {
        // 🔥 Better error handling
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }

        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = {
    verifyStudentToken
};