require("dotenv").config();
const app = require("./src/app");
const { connectToDatabase } = require("./src/db/db");
// Connect to the database before starting the server
connectToDatabase().then(() => {
    console.log("Database connection established. Starting server...");
}).catch((error) => {
    console.error("Failed to connect to database. Server will not start.", error);
    process.exit(1); // Exit the process with an error code
}
);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
