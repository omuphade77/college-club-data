const postgres = require('postgres');

const sql = postgres(process.env.DATABASE_URL);

async function connectToDatabase() {
    try {
        await sql`SELECT 1`; // Test the connection
        console.log('Connected to database successfully!');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
}

module.exports = { connectToDatabase, sql };