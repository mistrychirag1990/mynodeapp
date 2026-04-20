const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
  user: 'db',
  host: 'localhost',
  database: 'myappdb',
  password: 'db',
  port: 5432,
});

// ❌ REMOVE auto query from top

// ✅ Create function instead
async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT
    )
  `);
}

// routes
app.get('/', (req, res) => {
  res.send("Node + PostgreSQL App 🚀");
});

module.exports = app;

// ✅ Only run DB + server when app is started directly
if (require.main === module) {
  const port = process.env.PORT || 3000;

  initDB().then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  });
}
