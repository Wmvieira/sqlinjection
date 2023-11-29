const express = require("express");
const sqlite3 = require("sqlite3");
const app = express();
const port = 3001;

const userRoutes = require("./routes/userRoutes");
const phoneRoutes = require("./routes/phoneRoutes");

const db = new sqlite3.Database("./database.db");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT, isAdmin INTEGER)"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS phones (id INTEGER PRIMARY KEY, number TEXT, userId INTEGER)"
  );
});

app.use(express.json());

app.use("/api", userRoutes);

app.use("/api", phoneRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
