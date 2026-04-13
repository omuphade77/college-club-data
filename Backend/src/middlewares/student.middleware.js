const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

const verifyStudentToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // ❌ No token
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        // ✅ Extract token (Bearer TOKEN)
        const token = authHeader.split(" ")[1];

        // ❌ Invalid format
        if (!token) {
            return res.status(401).json({ message: "Invalid token format" });
        }

        // ✅ Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // ✅ Attach student info
        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = {
    verifyStudentToken
};